import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator'
import { CreateAdminInput } from './create-admin.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

import { ConfimField } from '@app/decorators'

//TODO: password length should be const in appConfig
@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number

  @Field({ nullable: true })
  @IsOptional()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password?: string

  @Field({ nullable: true })
  @ValidateIf((o) => o.password !== undefined)
  @ConfimField('password', { message: 'Password did not match' })
  passwordConfirmation?: string
}
