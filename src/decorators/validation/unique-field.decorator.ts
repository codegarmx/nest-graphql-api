import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

import { PrismaService } from '@app/prisma/prisma.service'

const prismaService = new PrismaService()

type UniqueFieldProperties = {
  isUpdate?: boolean
  model: string
  id?: number
  field: string
}

export const UniqueField = (
  property: UniqueFieldProperties,
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
          const ruleProps = args.constraints[0] as UniqueFieldProperties
          if (ruleProps.isUpdate) {
            const result = await prismaService[ruleProps.model].findFirst({
              where: { [ruleProps.field]: value, NOT: { id: ruleProps.id } },
            })

            return result ? false : true
          } else {
            const result = await prismaService[ruleProps.model].findFirst({
              where: { [ruleProps.field]: value },
            })

            return result ? false : true
          }
        },
      },
    })
  }
}
