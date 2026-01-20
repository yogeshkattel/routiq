import { MethodConfig } from "../decorators/method";
import { getFunctionsFromClass } from "./getFunctionsFromClass";

export type structuredRouteMethodData = {
    config: MethodConfig,
    method: (...args: any[]) => any
}



export function getStructuredRouteFromClasss(cls:any):structuredRouteMethodData[]  {
    const methods = getFunctionsFromClass(cls)
    const structuredRoute: structuredRouteMethodData[] = []
    for (const method of methods) {
        const metadata: MethodConfig = Reflect.getMetadata("method", cls.prototype, method)
        structuredRoute.push({ method: cls.prototype[method], config: metadata })

    }

    return structuredRoute
}