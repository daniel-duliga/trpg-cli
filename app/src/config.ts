import fs from 'fs'
import { dataBasePaths, fileExtensions } from "./constants"
import { FileUtil } from "./utils/file-util"

const configPath = `${dataBasePaths.data}/config${fileExtensions.json}`

export class Config {
    defaultEntity = ''
    
    static read(): Config {
        if (!fs.existsSync(configPath)) {
            FileUtil.writeJson(configPath, new Config())
        }
        const config: Config = FileUtil.readJson(configPath)
        return config
    }

    static write(config: Config): void {
        FileUtil.writeJson(configPath, config)
    }
}