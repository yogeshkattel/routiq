import { existsSync, readdirSync } from 'fs'
import { createRequire } from 'module'
import { join } from 'path'
export function getClassFromFolder(path: string):[object] {
    const newPath = join(process.cwd(), path)
    const folderExists = existsSync(newPath)
    console.log(newPath)
    if (!folderExists) throw new Error("Folder does not exists")
    const files = readdirSync(newPath)
    const classes= []
    for (const file of files) {
        const filePath = join(newPath, file)
        const classInFile = createRequire(filePath)
        classes.push(...Object.values(classInFile))
    }


    return classes as any

}
