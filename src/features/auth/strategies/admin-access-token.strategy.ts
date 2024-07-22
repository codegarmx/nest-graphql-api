import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

// Import types
import { AdminJwtPayload } from '../types'

@Injectable()
export class AdminAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'user-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: new ConfigService().getOrThrow<string>(
        'JWT_USER_ACCESS_SECRET',
      ),
    })
  }

  validate(payload: AdminJwtPayload): AdminJwtPayload {
    return payload
  }
}
