import { RequestHandler } from "express";

export function AfterWares(...afterwares: RequestHandler[]): MethodDecorator {
    return (target, propertyKey, descriptor?: PropertyDescriptor) => {

        Reflect.defineMetadata("afterwares", afterwares, target, propertyKey)
    }
}