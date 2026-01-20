import { getFunctionsFromClass } from "./getFunctionsFromClass";

export type structuredRouteMethodData = {
    path: string,
    method: (...args: any[]) => any
}



export function getStructuredRouteFromClasss(cls:any):structuredRouteMethodData[]  {
    const methods = getFunctionsFromClass(cls)
    const structuredRoute: structuredRouteMethodData[] = []
    for (const method of methods) {
        const metadata = Reflect.getMetadata("method", cls.prototype, method)
        structuredRoute.push({ method: cls.prototype[method], path: metadata })

    }

    return structuredRoute
}