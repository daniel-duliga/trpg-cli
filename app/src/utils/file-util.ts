import fs from 'fs'

export function walk (dir: string) {
    var results: string[] = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
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