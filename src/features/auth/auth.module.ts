import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { Encryption } from '@app/libs'

import { AdminModule } from '@app/features/admin/admin.module'

import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import {
  AdminAccessTokenStrategy,
  AdminResfreshTokenStrategy,
} from './strategies'

@Module({
  imports: [forwardRef(() => AdminModule), JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    AdminAccessTokenStrategy,
    AdminResfreshTokenStrategy,
    Encryption,
  ],
  exports: [AuthService],
})
export class AuthModule {}
