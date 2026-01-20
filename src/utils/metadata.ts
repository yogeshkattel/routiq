import "reflect-metadata";
import { getClassFromFolder } from "./getClassesFromFolder";
import { getStructuredRouteFromClasss, structuredRouteMethodData } from "./getMetadataOfFunctionsFromClass";


export type StructuredRoutes = {
    path: string,
    controllerClass: any
    paths: structuredRouteMethodData[]
}

export function getStructuredRouteData(controllerPath: string) {
    const classesFromFolder = getClassFromFolder(controllerPath)
    const strucutredRoutes: StructuredRoutes[] = []
    for (const cls of classesFromFolder) {

        const metadata = Reflect.getMetadata("controller", cls)
        
        const routeMetadata: structuredRouteMethodData[] = getStructuredRouteFromClasss(cls)
        strucutredRoutes.push({ path: metadata, controllerClass:cls ,paths: routeMetadata })


    }
    return strucutredRoutes
}
