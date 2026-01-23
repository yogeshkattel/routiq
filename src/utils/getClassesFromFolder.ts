import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'



export function getClassFromFolder(path: string): object[] {
    const newPath = join(process.cwd(), path)
    if (!existsSync(newPath)) throw new Error(`Folder does not exist ${newPath}`)

    const files = readdirSync(newPath)
    const classes = []

    for (const file of files) {
        const filePath = join(newPath, file)
        const stats = statSync(filePath)
        if (stats.isDirectory()) {
            classes.push(getClassFromFolder(filePath))
            continue;

        }
        if (!file.endsWith('.ts') && !file.endsWith('.js')) continue
        const exports = require(filePath)

        for (const value of Object.values(exports)) {
            if (typeof value === 'function' && isClass(value)) {
                classes.push(value)
            }
        }
    }
    return classes as any
}


export function isClass(fn: Function): boolean {
    return /^class\s/.test(Function.prototype.toString.call(fn))

}
