import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string

  @Field()
  @IsNotEmpty()
  @MinLength(4)
  lastName: string

  @Field()
  @IsNotEmpty({ message: 'test.HELLO' })
  @IsEmail({}, { message: 'test.HELLO' })
  email: string
}
