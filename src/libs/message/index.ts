import { ValidationArguments } from 'class-validator'

import { validationData, fieldData } from './data'

export class Message {
  validation(args: ValidationArguments, rule: string) {
    //console.log('my data =====>', args)
    return this.generateValidationMessage(
      validationData[rule],
      fieldData[args.property],
      args.constraints,
    )
  }

  private generateValidationMessage(
    text: string,
    fieldName: string,
    constraints: any[] = [],
  ) {
    let generatedText = text
    for (let i = 0; i < constraints.length; i++) {
      const vars = `{vars[${i}]}`
      const replacement = constraints[i]

      generatedText = generatedText.replace(vars, replacement)
    }
    return generatedText.replace('{field}', fieldName)
  }
}
