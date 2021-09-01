import fs from 'fs'

export function walk (dir: string): string[] {
    let results: string[] = []
    const list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        const stat = fs.statSync(file)
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file))
        } else { 
            /* Is a file */
            results.push(file)
        }
    })
    return results
}