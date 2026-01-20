export function Body() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:body", parameterIndex, target, propertyKey)
    }
}


export function Query() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:query", parameterIndex, target, propertyKey)
    }
}

export function Param() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:params", parameterIndex, target, propertyKey)
    }
}

export function Req() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:request", parameterIndex, target, propertyKey)
    }
}

export function Res() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:response", parameterIndex, target, propertyKey)
    }
}

export function Nxt() {
    return function (target: object, propertyKey: string, parameterIndex: number) {
        // const existing: number[] =  Reflect.getOwnMetadata("bodyParams", target, propertyKey) || []
        // existing.push(parameterIndex)
        Reflect.defineMetadata("arg:next", parameterIndex, target, propertyKey)
    }
}