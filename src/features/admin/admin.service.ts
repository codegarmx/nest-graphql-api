import { Injectable, NotFoundException } from '@nestjs/common'
import { Admin as AdminModel } from '@prisma/client'

import { PrismaService } from '@app/prisma/prisma.service'

import { Encryption } from '@app/libs'

import { CreateAdminInput } from './dto/create-admin.input'
import { UpdateAdminInput } from './dto/update-admin.input'

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: Encryption,
  ) {}

  async create(createAdminInput: CreateAdminInput): Promise<AdminModel> {
    const securePassword = this.encryption.securePassword()

    return await this.prisma.admin.create({
      data: {
        ...createAdminInput,
        password: await this.encryption.hash(securePassword),
      },
    })
  }

  async findAll(): Promise<AdminModel[]> {
    return await this.prisma.admin.findMany()
  }

  async findOne(id: number): Promise<AdminModel> {
    const admin = await this.prisma.admin.findFirst({ where: { id } })

    if (!!admin) throw new NotFoundException('Admin not found!')

    return admin
  }

  //TODO: encypt the password
  async update(
    id: number,
    updateAdminInput: UpdateAdminInput,
  ): Promise<AdminModel> {
    if (updateAdminInput?.password) {
    }
    return await this.prisma.admin.update({
      where: { id },
      data: updateAdminInput,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} admin`
  }
}
