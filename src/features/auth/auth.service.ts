import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { CreateAdminInput } from '@app/features/admin/dto/create-admin.input'
import { AdminService } from '@app/features/admin/admin.service'
import { AdminJwtPayload } from './types'

import { Auth } from './entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly adminService: AdminService,
  ) {}

  async signUp(createAdminInput: CreateAdminInput): Promise<Auth> {
    const newAdmin = await this.adminService.create(createAdminInput)

    const jwtTokens = await this.createJwtToken({
      sub: newAdmin.id,
      name: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
    })

    await this.adminService.updateRefreshToken(
      newAdmin.id,
      jwtTokens.refreshToken,
    )

    return {
      jwt: jwtTokens.accessToken,
      refreshJwt: jwtTokens.refreshToken,
    }
  }

  async createJwtToken(payload: AdminJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_USER_ACCESS_SECRET'),
        expiresIn: this.config.getOrThrow<string>(
          'JWT_USER_ACCESS_SECRET_EXPIRES',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_USER_REFRESH_SECRET'),
        expiresIn: this.config.getOrThrow<string>(
          'JWT_USER_REFRESH_SECRET_EXPIRES',
        ),
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
