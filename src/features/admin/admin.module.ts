import { forwardRef, Module } from '@nestjs/common'

import { PrismaModule } from '@app/prisma/prisma.module'

import { Encryption } from '@app/libs'

import { AuthModule } from '@app/features/auth/auth.module'

import { AdminService } from './admin.service'
import { AdminResolver } from './admin.resolver'

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
  providers: [AdminResolver, AdminService, Encryption],
  exports: [AdminService],
})
export class AdminModule {}
