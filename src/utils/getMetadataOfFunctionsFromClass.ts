import { MethodConfig, MethodInternalConfig } from "../decorators/method";
import { getFunctionsFromClass } from "./getFunctionsFromClass";

export type structuredRouteMethodData = {
    config: MethodInternalConfig,
    method: any
}



export function getStructuredRouteFromClasss(cls:any):structuredRouteMethodData[]  {
    const functions = getFunctionsFromClass(cls)
    const structuredRoute: structuredRouteMethodData[] = []
    for (const func of functions) {
        const metadata = Reflect.getMetadata("method", cls.prototype, func)
        structuredRoute.push({ method: cls.prototype[func], config: metadata })

    }

    return structuredRoute
}