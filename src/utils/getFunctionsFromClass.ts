export function getFunctionsFromClass(cls: any) {
    return Object.getOwnPropertyNames(cls.prototype).filter(name => name !== 'constructor' && typeof cls.prototype[name] == "function")
}