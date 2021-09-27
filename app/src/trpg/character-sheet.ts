import { Config } from '../config'
import { Entities } from './entities'

export class CharacterSheet {
    static getCharacterSheet(): any {
        const config = Config.read()
        if (config.defaultEntity) {
            return Entities.getEntity(config.defaultEntity)
        } else {
            return {}
        }
    }

    static getValue(path: string): any {
        const characterSheet = this.getCharacterSheet()
        const keys = path.split('/')
        let result = characterSheet
        for (const key of keys) {
            result = result[key]
        }
        return result
    }
}