import {
  Logger,
  BadRequestException,
  Catch,
  ConflictException,
  GatewayTimeoutException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  private logger = new Logger(PrismaExceptionFilter.name)

  private errorCodeStatus = {
    P1000: HttpStatus.SERVICE_UNAVAILABLE,
    P1001: HttpStatus.SERVICE_UNAVAILABLE,
    P1002: HttpStatus.GATEWAY_TIMEOUT,
    P1003: HttpStatus.SERVICE_UNAVAILABLE,
    P1008: HttpStatus.REQUEST_TIMEOUT,
    P1010: HttpStatus.SERVICE_UNAVAILABLE,
    P1011: HttpStatus.INTERNAL_SERVER_ERROR,
    P1012: HttpStatus.INTERNAL_SERVER_ERROR,
    P1013: HttpStatus.SERVICE_UNAVAILABLE,
    P1014: HttpStatus.INTERNAL_SERVER_ERROR,
    P1015: HttpStatus.SERVICE_UNAVAILABLE,
    P1016: HttpStatus.PRECONDITION_FAILED,
    P1017: HttpStatus.SERVICE_UNAVAILABLE,
    P2000: HttpStatus.BAD_REQUEST,
    P2001: HttpStatus.NOT_FOUND,
    P2002: HttpStatus.CONFLICT,
    P2003: HttpStatus.CONFLICT,
    P2004: HttpStatus.CONFLICT,
    P2005: HttpStatus.BAD_REQUEST,
    P2006: HttpStatus.BAD_REQUEST,
    P2007: HttpStatus.BAD_REQUEST,
    P2008: HttpStatus.BAD_REQUEST,
    P2009: HttpStatus.BAD_REQUEST,
    P2010: HttpStatus.INTERNAL_SERVER_ERROR,
    P2011: HttpStatus.BAD_REQUEST,
    P2012: HttpStatus.PRECONDITION_FAILED,
    P2013: HttpStatus.PRECONDITION_FAILED,
    P2014: HttpStatus.BAD_REQUEST,
    P2015: HttpStatus.NOT_FOUND,
    P2016: HttpStatus.INTERNAL_SERVER_ERROR,
    P2017: HttpStatus.INTERNAL_SERVER_ERROR,
    P2018: HttpStatus.NOT_FOUND,
    P2019: HttpStatus.BAD_REQUEST,
    P2020: HttpStatus.BAD_REQUEST,
    P2021: HttpStatus.BAD_REQUEST,
    P2022: HttpStatus.BAD_REQUEST,
    P2023: HttpStatus.BAD_REQUEST,
    P2024: HttpStatus.GATEWAY_TIMEOUT,
    P2025: HttpStatus.NOT_FOUND,
    P2027: HttpStatus.INTERNAL_SERVER_ERROR,
    P2030: HttpStatus.INTERNAL_SERVER_ERROR,
    P2033: HttpStatus.BAD_REQUEST,
  }

  catch(exception: Prisma.PrismaClientKnownRequestError) {
    const status = this.errorCodeStatus[exception.code]
    const errorMessage = exception?.meta?.message || exception?.message

    this.logger[status >= 400 && status < 500 ? 'warn' : 'error']({
      error: {
        code: exception.code,
        message: exception?.message || exception?.meta?.message,
        meta: exception.meta,
        stack: exception.stack,
      },
      message: 'database error',
    })

    switch (status) {
      case 400:
        throw new BadRequestException(errorMessage)
        break
      case 404:
        throw new NotFoundException(errorMessage)
        break
      case 408:
        throw new RequestTimeoutException(errorMessage)
        break
      case 409:
        throw new ConflictException(errorMessage)
        break
      case 412:
        throw new HttpException(errorMessage, status)
        break
      case 503:
        throw new ServiceUnavailableException(errorMessage)
        break
      case 504:
        throw new GatewayTimeoutException(errorMessage)
        break
      default:
        throw new InternalServerErrorException(errorMessage)
        break
    }
  }
}
