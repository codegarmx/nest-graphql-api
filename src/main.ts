import { NestFactory } from '@nestjs/core'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'

import { appConfig } from '@app/config'

import { PrismaExceptionFilter } from '@app/filters'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = appConfig()

  app.useGlobalPipes(new I18nValidationPipe())

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new I18nValidationExceptionFilter({
      detailedErrors: true,
    }),
  )

  await app.listen(config.port)
}
bootstrap()
