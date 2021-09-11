import fs from 'fs'
import path from 'path'

export class FileUtil {
    static walk (dir: string): string[] {
        let results: string[] = []
        const list = fs.readdirSync(dir)
        list.forEach(function(file) {
            file = dir + '/' + file
            const stat = fs.statSync(file)
            if (stat && stat.isDirectory()) { 
                results = results.concat(FileUtil.walk(file)) // Recurse into a subdirectory
            } else { 
                results.push(file) // Is a file
            }
        })
        return results
    }

    static getFilesListFromPath(path: string, extension: string): string[] {
        let allSheets = FileUtil.walk(path)
        allSheets = allSheets.map((x) =>
            x.replace(`${path}/`, '').replace(extension, ''),
        )
        return allSheets
    }

    static readJson(filePath: string): any {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    }

    static writeJson(filePath: string, data: any): void {
        const dirName = path.dirname(filePath)
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true })
        }
        fs.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf-8" })
    }
}