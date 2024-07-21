export interface AdminJwtPayload {
  sub: number
  name: string
  lastName?: string
  email: string
}

export interface AdminJwtRTPayload extends AdminJwtPayload {
  refreshToken: string
}
