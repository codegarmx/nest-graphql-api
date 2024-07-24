import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { CreateAdminInput } from '@app/features/admin/dto/create-admin.input'

import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.input'
import { Auth } from './entities/auth.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signUp(@Args('signUpInput') createAdminInput: CreateAdminInput) {
    return this.authService.signUp(createAdminInput)
  }

  @Mutation(() => Auth)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return await this.authService.signIn(signInInput)
  }
}
