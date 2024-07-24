import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

import { PrismaService } from '@app/prisma/prisma.service'

const prismaService = new PrismaService()

type FieldExistsProperties = {
  model: string
  field: string
}

export const FieldExists = (
  property: FieldExistsProperties,
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'uniqueField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const ruleProps = args.constraints[0] as FieldExistsProperties
          const result = await prismaService[ruleProps.model].findFirst({
            where: { [ruleProps.field]: value },
          })

          return result ? true : false
        },
      },
    })
  }
}
