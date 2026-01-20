import express from "express";
import { getStructuredRouteData } from "./metadata";
import { parsePath } from "./parsePath";

const router = express.Router()

export function routerRegister(controllerPath: string) {
    const routesData = getStructuredRouteData(controllerPath)
    for (const routes of routesData) {
        for (const route of routes.paths) {
            const path = parsePath(
                [route.config?.version, routes.path, route.config.path,]
                    .filter((p): p is string => p !== undefined && p !== null)

            )
            router[route.config.method](path, route.method.bind(route.method))
        }
    }
    return router
}

