import { Injectable, NotFoundException } from '@nestjs/common'
import { Admin as AdminModel } from '@prisma/client'

import { PrismaService } from '@app/prisma/prisma.service'

import { Encryption } from '@app/libs'

import { AuthService } from '@app/features/auth/auth.service'

import { DeleteItem } from '@app/entities'

import { CreateAdminInput } from './dto/create-admin.input'
import { UpdateAdminInput } from './dto/update-admin.input'

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryption: Encryption,
    private readonly authService: AuthService,
  ) {}

  async create(createAdminInput: CreateAdminInput): Promise<AdminModel> {
    const securePassword = this.encryption.securePassword()

    //TODO: if user was created, send email

    const newAdmin = await this.prismaService.admin.create({
      data: {
        ...createAdminInput,
        password: await this.encryption.hash(securePassword),
      },
    })

    const jwtTokens = await this.authService.createJwtToken({
      sub: newAdmin.id,
      name: newAdmin.firstName,
      lastName: newAdmin.lastName,
      email: newAdmin.email,
    })

    await this.updateRefreshToken(newAdmin.id, jwtTokens.refreshToken)

    return newAdmin
  }

  async findAll(): Promise<AdminModel[]> {
    return await this.prismaService.admin.findMany()
  }

  async findOne(id: number): Promise<AdminModel> {
    const admin = await this.prismaService.admin.findFirst({ where: { id } })

    if (!!admin) throw new NotFoundException('Admin not found!')

    return admin
  }

  async update(
    id: number,
    updateAdminInput: UpdateAdminInput,
  ): Promise<AdminModel> {
    if (updateAdminInput?.password) {
      const hashedPassword = await this.encryption.hash(
        updateAdminInput.password,
      )

      Object.assign(hashedPassword, { password: hashedPassword })
    }
    return await this.prismaService.admin.update({
      where: { id },
      data: updateAdminInput,
    })
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.prismaService.admin.update({
      where: { id },
      data: { refreshToken: await this.encryption.hash(refreshToken) },
    })
  }

  async remove(id: number): Promise<DeleteItem> {
    await this.prismaService.admin.delete({ where: { id } })

    return {
      id,
      success: true,
    }
  }
}
