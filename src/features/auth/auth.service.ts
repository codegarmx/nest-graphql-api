import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { AdminJwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

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
