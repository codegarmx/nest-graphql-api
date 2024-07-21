import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export const ConfimField = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'confirmField',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropetyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropetyName]
          return relatedValue === value
        },
      },
    })
  }
}
