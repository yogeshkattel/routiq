export function parsePath(paths:string[]): string {
    return "/"+paths.map(path => path.replace("/", "").trim()).join("/")
}