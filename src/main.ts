import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { appConfig } from '@app/config'

import { PrismaExceptionFilter } from '@app/filters'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = appConfig()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  app.useGlobalFilters(new PrismaExceptionFilter())

  await app.listen(config.port)
}
bootstrap()
