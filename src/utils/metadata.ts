import "reflect-metadata";
import { getClassFromFolder } from "./getClassesFromFolder";
import { getStructuredRouteFromClasss, structuredRouteMethodData } from "./getMetadataOfFunctionsFromClass";


export type StructuredRoutes = {
    path: string,
    paths: structuredRouteMethodData[]
}

export function getStructuredRouteData(controllerPath: string) {
    const classesFromFolder = getClassFromFolder(controllerPath)
    const strucutredRoutes: StructuredRoutes[] = []
    for (const cls of classesFromFolder) {

        const metadata = Reflect.getMetadata("controller", cls)
        
        const routeMetadata: structuredRouteMethodData[] = getStructuredRouteFromClasss(cls)
        strucutredRoutes.push({ path: metadata, paths: routeMetadata })


    }
    return strucutredRoutes
}
