
import express from 'express'
import { routerRegister } from '../utils/routerRegister';

type ControllerOptions =
    | { autoDiscoverRoutes: true; controllerPath: string }
    | { autoDiscoverRoutes: false; controllerPath?: string }

export type CreateServer = {
    port: number;
    callbackFunc: (...args: any[]) => any,
    controllerOptions?: ControllerOptions

}
export function CreateServer(config: CreateServer) {
    const app = express()
    if (config?.controllerOptions?.autoDiscoverRoutes) {
        const routes = routerRegister(config.controllerOptions.controllerPath)
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }));
        app.use(routes)


    }
    app.listen(config.port, config.callbackFunc.bind(config.callbackFunc))
}