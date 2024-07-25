import { Resolver, Mutation, Args } from '@nestjs/graphql'

import { CreateAdminInput } from '@app/features/admin/dto/create-admin.input'

import { AuthService } from './auth.service'
import { AdminSignInInput } from './dto/admin-sign-in.input'
import { Auth } from './entities/auth.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // This is an example
  @Mutation(() => Auth)
  async signUp(@Args('signUpInput') createAdminInput: CreateAdminInput) {
    return this.authService.signUp(createAdminInput)
  }

  @Mutation(() => Auth)
  async adminSignIn(@Args('signInInput') signInInput: AdminSignInInput) {
    return await this.authService.adminSignIn(signInInput)
  }
}
