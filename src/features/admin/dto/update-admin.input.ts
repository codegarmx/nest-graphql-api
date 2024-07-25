import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsStrongPassword,
  ValidateIf,
  ValidationArguments,
} from 'class-validator'
import { CreateAdminInput } from './create-admin.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

import { ConfimField, FieldExists } from '@app/decorators'

import { Message } from '@app/libs'

const messages = new Message()

//TODO: password length should be const in appConfig
@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @FieldExists(
    {
      model: 'admin',
      field: 'id',
    },
    {
      message: (args: ValidationArguments) =>
        messages.validation(args, 'fieldExists'),
    },
  )
  id: number

  @Field({ nullable: true })
  @IsOptional()
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
  password?: string

  @Field({ nullable: true })
  @ValidateIf((o) => o.password !== undefined)
  @ConfimField('password', {
    message: (args: ValidationArguments) =>
      messages.validation(args, 'fieldConfirmation'),
  })
  passwordConfirmation?: string
}
