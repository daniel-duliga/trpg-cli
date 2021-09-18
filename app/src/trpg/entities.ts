import { dataBasePaths, fileExtensions } from "../constants";
import { FileUtil } from '../utils/file-util'

export class Entities {
    static getAllEntities(): string[] {
        return FileUtil.getFilesListFromPath(dataBasePaths.entities, fileExtensions.json)
    }

    static getEntityFullPath(filePath: string): string {
        return `${dataBasePaths.entities}/${filePath}${fileExtensions.json}`
    }

    static getEntity(entityPath: string): any {
        return FileUtil.readJson(this.getEntityFullPath(entityPath))
    }

    static saveSheetAsEntity(entityPath: string, sheet: any): void {
        FileUtil.writeJson(this.getEntityFullPath(entityPath), sheet)
    }
}