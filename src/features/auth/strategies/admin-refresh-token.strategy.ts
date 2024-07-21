import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'

// Import types
import { AdminJwtRTPayload } from '../types'

@Injectable()
export class AdminResfreshTokenStrategy extends PassportStrategy(
  Strategy,
  'user-jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: new ConfigService().getOrThrow<string>(
        'JWT_USER_REFRESH_SECRET',
      ),
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: AdminJwtRTPayload): Record<string, unknown> {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
    return { ...payload, refreshToken }
  }
}
