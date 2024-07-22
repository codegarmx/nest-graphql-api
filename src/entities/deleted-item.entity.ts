import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class DeleteItem {
  @Field(() => Int)
  id: number

  @Field()
  success: boolean

  @Field({ nullable: true })
  message?: string
}
