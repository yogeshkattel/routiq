import express from "express";
import { getStructuredRouteData } from "./metadata";
import { parsePath } from "./parsePath";

const router = express.Router()

export function routerRegister(controllerPath: string) {
    const controllers = getStructuredRouteData(controllerPath)
    for (const controller of controllers) {
        for (const route of controller.paths) {
            const path = parsePath(
                [route.config?.version, controller.path, route.config.path,]
                    .filter((p): p is string => p !== undefined && p !== null)

            )
            console.log(route)
            
            router[route.config.method](path, route.method.bind(route.method))
        }
    }
    return router
}

