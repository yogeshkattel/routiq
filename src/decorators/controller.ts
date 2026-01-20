export function Controller(metadata: string) {
    return function (target:object) {
        Reflect.defineMetadata("controller", metadata, target);
    }
}
