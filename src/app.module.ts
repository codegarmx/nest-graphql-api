import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

import { PrismaModule } from '@app/prisma/prisma.module'

import { appConfig } from '@app/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AdminModule } from './features/admin/admin.module'
import { AuthModule } from './features/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    // GraphQL
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        playground: config.getOrThrow('appConfig.env') !== 'prod',
        sortSchema: true,
        formatError: (err) => ({
          //TODO: look for a way to not override message prop
          message: err.message,
          ...(err?.extensions?.originalError
            ? {
                message: err?.extensions?.originalError['message'],
              }
            : {}),
          error: err?.extensions?.originalError['error'],
          status:
            err?.extensions?.status ||
            err?.extensions?.originalError['statusCode'] ||
            err?.extensions?.code,
        }),
      }),
    }),
    PrismaModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
