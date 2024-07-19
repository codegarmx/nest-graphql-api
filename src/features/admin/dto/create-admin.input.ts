import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

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
  @IsNotEmpty()
  @IsEmail()
  email: string
}
