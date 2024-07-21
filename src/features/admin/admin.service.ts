import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
    private readonly prisma: PrismaService,
    private readonly encryption: Encryption,
    private readonly authService: AuthService,
  ) {}

  async create(createAdminInput: CreateAdminInput): Promise<AdminModel> {
    const securePassword = this.encryption.securePassword()

    //TODO: if user was created, send email

    const newAdmin = await this.prisma.admin.create({
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
    return await this.prisma.admin.findMany()
  }

  async findOne(id: number): Promise<AdminModel> {
    const admin = await this.prisma.admin.findFirst({ where: { id } })

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
    return await this.prisma.admin.update({
      where: { id },
      data: updateAdminInput,
    })
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    try {
      await this.prisma.admin.update({
        where: { id },
        data: { refreshToken: await this.encryption.hash(refreshToken) },
      })
    } catch (err) {
      //TODO: create a prisma exception filter
      throw new BadRequestException('Invalid user!')
    }
  }

  async remove(id: number): Promise<DeleteItem> {
    await this.prisma.admin.delete({ where: { id } })

    return {
      id,
      success: true,
    }
  }
}
