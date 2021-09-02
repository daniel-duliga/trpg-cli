import YAML from 'yaml'
import fs from 'fs'

import { DiceUtil } from '../../utils/dice-util'
import { TableUtil } from '../../utils/table-util'

const sheet = fs.readFileSync('app/src/experiments/sheets/sheet.yml', 'utf-8')
const parsedSheet = YAML.parse(sheet)
for (const fieldName in parsedSheet) {
    const field = parsedSheet[fieldName]
    switch(field.type) {
        case 'dice_roll':
            parsedSheet[fieldName] = DiceUtil.rollDiceFormula(field.value).value
            break
        case 'table_roll':
            parsedSheet[fieldName] = TableUtil.rollOnTable(field.value)
            break
    }
}

console.log(parsedSheet)