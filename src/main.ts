import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { appConfig } from '@app/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = appConfig()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  await app.listen(config.port)
}
bootstrap()
