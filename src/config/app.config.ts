import { registerAs } from '@nestjs/config'

export const appConfig = registerAs('appConfig', () => ({
  env: process.env.NODE_ENV || 'development',
  port: +process.env.LISTENING_PORT || 4001,
  fallbackLanguage: process.env.FALLBACK_LANGUAGE || 'en',
}))
