import { dataBasePaths, fileExtensions } from "../constants";
import { FileUtil } from "./file-util";

export class EntitiesUtil {
    static getAllEntities(): string[] {
        return FileUtil.getFilesListFromPath(dataBasePaths.entities, fileExtensions.json)
    }

    static getEntity(path: string): any {
        return FileUtil.readJson(`${dataBasePaths.entities}/${path}${fileExtensions.json}`)
    }

    static saveSheetAsEntity(entityPath: string, sheet: any): void {
        FileUtil.writeJson(`${dataBasePaths.entities}/${entityPath}${fileExtensions.json}`, sheet)
    }
}