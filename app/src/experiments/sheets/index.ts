import YAML from 'yaml'
import fs from 'fs'

import { DiceUtil } from '../../utils/dice-util'
import { TableUtil } from '../../utils/table-util'

const sheetFile = fs.readFileSync('app/src/experiments/sheets/Action Move.yml', 'utf-8')
const sheet = YAML.parse(sheetFile)
for (const fieldName in sheet) {
    const field = sheet[fieldName]
    switch(field.type) {
        case 'dice_roll':
            sheet[fieldName] = DiceUtil.rollDiceFormula(field.value).value
            break
        case 'table_roll':
            sheet[fieldName] = TableUtil.rollOnTable(field.value)
            break
        case 'eval':
            field.value = field.value.replaceAll('$', 'sheet.')
            console.log(field.value)
            sheet[fieldName] = eval(field.value)
    }
}

console.log(sheet)