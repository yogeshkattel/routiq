import { RequestHandler } from "express";

export function Middleware(...middlewares: RequestHandler[]): MethodDecorator {
    return (target, propertyKey, descriptor?: PropertyDescriptor) => {

        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey)
    }
}