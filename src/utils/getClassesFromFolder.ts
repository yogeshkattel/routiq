import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

export function getClassFromFolder(path: string): object[] {
    const newPath = join(process.cwd(), path)
    if (!existsSync(newPath)) throw new Error("Folder does not exist")

    const files = readdirSync(newPath)
    const classes = []

    for (const file of files) {
        const filePath = join(newPath, file)
        const classInFile = require(filePath) // now works in ESM
        classes.push(...Object.values(classInFile))
    }
    return classes as any
}
