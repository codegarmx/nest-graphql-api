import { NestFactory } from '@nestjs/core'

import { appConfig } from '@app/config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = appConfig()

  await app.listen(config.port)
}
bootstrap()
