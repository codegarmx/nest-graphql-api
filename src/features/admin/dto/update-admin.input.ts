import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsStrongPassword,
} from 'class-validator'
import { CreateAdminInput } from './create-admin.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

//TODO: add password confirmation
//TODO: password length should be const in appConfig
@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number

  @Field()
  @IsOptional()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password?: string
}
