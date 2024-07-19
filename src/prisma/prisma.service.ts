import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly config = new ConfigService()
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
      ],
    })
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log({
        params: event.params,
        ...(this.config.get('appConfig.env') === 'prod'
          ? {}
          : { query: event.query }),
        duration: `${event.duration}ms`,
      })
    })

    this.$on('error', (event) => {
      this.logger.error(event)
    })
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
