import { ValidationArguments } from 'class-validator'

import { validationData, fieldData, exceptionData } from './data'

export class Message {
  validation(args: ValidationArguments, rule: string) {
    return this.generateValidationMessage(
      validationData[rule],
      fieldData[args.property],
      args.constraints,
    )
  }

  exception(rule: string, field: string = '') {
    return exceptionData[rule].replaceAll('{field}', field)
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
    return generatedText.replaceAll('{field}', fieldName)
  }
}
