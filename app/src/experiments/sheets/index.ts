import YAML from 'yaml'
import fs from 'fs'

import { rollDiceFormula } from '../../utils/dice-util'

const sheet = fs.readFileSync('app/src/experiments/sheets/sheet.yml', 'utf-8')
const parsedSheet = YAML.parse(sheet)
for (const fieldName in parsedSheet) {
    const field = parsedSheet[fieldName]
    if (field.type === 'dice_roll') {
        field.value = rollDiceFormula(field.value).value
        continue
    }
}

console.log(parsedSheet)