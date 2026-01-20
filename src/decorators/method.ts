import { NextFunction, Request, Response } from "express"
import { HttpEnum } from "../enums/http.enum";


export type MethodConfig = {
    method: HttpEnum,
    path: string,
    version?: string
}

export function Method(config: MethodConfig): MethodDecorator {
    return (target, propertyKey, descriptor?: PropertyDescriptor) => {

        if (!descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey as string)!;
        }
        const original = descriptor.value 

        descriptor.value = function (req: Request, res: Response, next: NextFunction) {
            const result = original.apply(this, [req, res, next])
            if (res == null) {
                return
            }
            if (result instanceof Promise) {
                result.then(data => res.json(data)).catch(err => res.status(500).json({ error: err?.message }))
            } else {
                res.json(result)
            }
        }
        Reflect.defineMetadata("method", config, target, propertyKey);

        return descriptor
    }
}