import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, ValidationArguments } from 'class-validator'

import { FieldExists } from '@app/decorators'

import { Message } from '@app/libs'

const messages = new Message()

@InputType()
export class AdminSignInInput {
  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'signInError'),
  })
  @IsEmail(
    {},
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'signInError'),
    },
  )
  @FieldExists(
    {
      model: 'admin',
      field: 'email',
    },
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'signInError'),
    },
  )
  email: string

  @Field()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      messages.validation(args, 'signInError'),
  })
  password: string
}
