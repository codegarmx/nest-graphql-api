import { Test, TestingModule } from '@nestjs/testing'
import { AdminService } from './admin.service'

import { PrismaService } from '@app/prisma/prisma.service'
import { Encryption } from '@app/libs'
import { AuthService } from '@app/features/auth/auth.service'

describe('AdminService', () => {
  let service: AdminService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: {
            admin: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: Encryption,
          useValue: { securePassword: jest.fn(), hash: jest.fn() },
        },
        { provide: AuthService, useValue: { createJwtToken: jest.fn() } },
      ],
    }).compile()

    service = module.get<AdminService>(AdminService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
