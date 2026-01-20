import express from "express";
import { getStructuredRouteData } from "./metadata";
import { parsePath } from "./parsePath";

const router = express.Router()

export function routerRegister(controllerPath: string) {
    const routesData = getStructuredRouteData(controllerPath)
    for (const routes of routesData) {
        for (const route of routes.paths) {
            const path = parsePath([routes.path, route.path,])
            console.log(path)
            router.get(path, route.method.bind(route.method))
        }
    }
    return router
}

