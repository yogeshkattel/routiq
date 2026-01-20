import { NextFunction, Request, RequestHandler, Response } from "express"
import { HttpEnum } from "../enums/http.enum";


export type MethodConfig = {
    method: HttpEnum,
    path: string,
    version?: string
}

export type MethodInternalConfig = MethodConfig & { methodName: string };



export function Method(config: MethodConfig): MethodDecorator {
    return (target, propertyKey, descriptor?: PropertyDescriptor) => {
        if (!descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey as string)!;
        }
        const original = descriptor.value

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const store = new Map<number, any>();

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
                const data = await original.apply(this, args)

                const afterwares: RequestHandler[] = Reflect.getMetadata("afterwares", target, original.name)

                for (const aw of afterwares) {
                    await new Promise<void>((resolve, reject) => {
                        try {
                            aw(req, res, (err?: any) => {
                                if (err) return reject(err)
                                resolve();
                            })
                        } catch (err) {

                            reject(err)
                        }
                    })
                }
                if (!res.headersSent) res.json(data)
            } catch (err: any) {
                return res.status(500).json({ error: err?.message ?? err ?? "Internal Server Error" })
            }
        }
        Reflect.defineMetadata("method", { ...config, methodName: propertyKey }, target, propertyKey);

        return descriptor
    }
}