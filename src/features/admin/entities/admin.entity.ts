import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Admin {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
