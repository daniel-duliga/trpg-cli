import { Config } from '../config'
import { FileUtil } from '../utils/file-util'
import { ObjectUtil } from '../utils/object-util'
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

    static getAttributes(): string[] {
        const characterSheet = CharacterSheet.getCharacterSheet()
        const attributes = ObjectUtil.getObjectAttributes(characterSheet)
        return attributes
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

    static setValue(path: string, newValue: any): void {
        const characterSheet = this.getCharacterSheet()
        const pathSegments = path.split('/')
        const pathSegmentIndex = pathSegments.length - 1
        const attribute = pathSegments[pathSegmentIndex]
        let field: any = {}
        for (let index = 0; index < pathSegmentIndex; index++) {
            field = characterSheet[pathSegments[index]];
        }
        const oldValue = field[attribute]
        switch(typeof(oldValue)) {
            case 'number': {
                field[attribute] = +newValue
                break
            }
            case 'boolean': {
                field[attribute] = newValue === 'true'
                break
            }
            case 'string':
            default:
                field[attribute] = newValue
        }
        const config = Config.read()
        Entities.saveEntity(config.defaultEntity, characterSheet)
    }
}