import fs from 'fs'
import YAML from 'yaml'

import { dataBasePaths, fileExtensions } from "../constants"
import { FileUtil } from "../utils/file-util"
import { Sheets } from './sheets'

export class Moves {
    static getAllMoves(): string[] {
        return FileUtil.getFilesListFromPath(dataBasePaths.moves, fileExtensions.yml)
    }

    static rollMove(movePath: string): any {
        const moveFile = fs.readFileSync(`${dataBasePaths.moves}/${movePath}${fileExtensions.yml}`, 'utf-8')
        const move = YAML.parse(moveFile)
        return Sheets.processSheet(move)
    }
}