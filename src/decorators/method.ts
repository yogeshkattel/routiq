import { NextFunction, Request, Response } from "express"
import { HttpEnum } from "../enums/http.enum";


export type MethodConfig = {
    method: HttpEnum,
    path: string,
    version?: string
}

export type MethodInternalConfig = MethodConfig & { methodName: string };



export function Method(config: MethodConfig): MethodDecorator {
    return (target, propertyKey, descriptor?: PropertyDescriptor) => {
        const store = new Map<number, any>();
        if (!descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey as string)!;
        }
        const original = descriptor.value

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {

            let map = {
                "arg:body": req.body,
                "arg:query": req.query,
                "arg:params": req.params,
                "arg:request": req,
                "arg:response": res,
                "arg:next": next,
                "middleware": undefined
            } as const
            const propertyMetadataKey: (keyof typeof map)[] = Reflect.getOwnMetadataKeys(target, original.name)

            const injectableArgsKey: (keyof typeof map)[] = propertyMetadataKey.filter((key: string) => key.startsWith("arg"))
           
            for (const key of injectableArgsKey) {
                const argPostion = Reflect.getMetadata(key, target, original.name)
                store.set(argPostion, map[key])

            }

            const args: any[] = [];

            for (const [index, value] of store.entries()) {
                args[index] = value;
            }
            const result = original.apply(this, args)
            if (res == null) {
                return
            }
            if (result instanceof Promise) {
                result.then(data => res.json(data)).catch(err => res.status(500).json({ error: err?.message }))
            } else {
                res.json(result)
            }
        }
        Reflect.defineMetadata("method", { ...config, methodName: propertyKey }, target, propertyKey);

        return descriptor
    }
}