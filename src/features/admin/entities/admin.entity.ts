import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Admin {
  @Field(() => Int)
  id: number

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string
}
