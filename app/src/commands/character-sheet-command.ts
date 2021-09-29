import { CharacterSheet } from "../trpg/character-sheet"
import { ConsoleUtil } from "../utils/console-util"
import { BaseCommand } from "./base-command"
import { PromptService } from "../services/prompt-service"

export class CharacterSheetCommand extends BaseCommand {
    name = '🌟 View Character Sheet'

    async execute(): Promise<boolean> {
        const characterSheet = CharacterSheet.getCharacterSheet()
        ConsoleUtil.logObjectResult(characterSheet)
        return await this.promptOptions()
    }

    private async promptOptions(): Promise<boolean> {
        const option = await PromptService.promptAutocomplete("Options", ["Edit Attribute", "Back"])
        switch (option) {
            case "Edit Attribute": {
                const attributes = CharacterSheet.getAttributes()
                const attribute = await PromptService.promptAutocomplete("Attribute", attributes)
                return this.editAttribute(attribute)
            }
            default: {
                return super.execute()
            }
        }
    }

    private async editAttribute(attribute: string): Promise<boolean> {
        const value = CharacterSheet.getValue(attribute)
        const attributeType = typeof(value)
        switch(attributeType) {
            case 'string':
            case 'number':
            case 'boolean': {
                const newValue = await PromptService.promptInput(attribute)
                CharacterSheet.setValue(attribute, newValue)
                break;
            }
            default:
                ConsoleUtil.logProgress(`Attribute ${attribute} is not editable.`)
        }
        return this.execute()
    }
}