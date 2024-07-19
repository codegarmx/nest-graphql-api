import { Module } from '@nestjs/common'

import { PrismaModule } from '@app/prisma/prisma.module'

import { Encryption } from '@app/libs'

import { AdminService } from './admin.service'
import { AdminResolver } from './admin.resolver'

@Module({
  imports: [PrismaModule],
  providers: [AdminResolver, AdminService, Encryption],
})
export class AdminModule {}
