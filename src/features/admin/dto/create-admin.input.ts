import { InputType, Field } from '@nestjs/graphql'
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  ValidationArguments,
} from 'class-validator'

import { UniqueField, ConfimField } from '@app/decorators'

import { Message } from '@app/libs'

const messages = new Message()

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'isNotEmpty'),
  })
  @MinLength(3, {
    message: (args: ValidationArguments) =>
      messages.validation(args, 'minLength'),
  })
  firstName: string

  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'isNotEmpty'),
  })
  @MinLength(4, {
    message: (args: ValidationArguments) =>
      messages.validation(args, 'minLength'),
  })
  lastName: string

  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'isNotEmpty'),
  })
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'isEmail'),
    },
  )
  @UniqueField(
    {
      isUpdate: false,
      model: 'admin',
      field: 'email',
    },
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'uniqueField'),
    },
  )
  email: string

  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'isNotEmpty'),
  })
  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'strongPassword'),
    },
  )
  password: string

  @Field()
  @ConfimField('password', { message: 'Password did not match' })
  passwordConfirmation: string
}
