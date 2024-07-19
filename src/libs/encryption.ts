import * as argon2 from 'argon2'

export class Encryption {
  async hash(text: string): Promise<string> {
    return await argon2.hash(text)
  }

  async compare(text: string, hashedText: string): Promise<boolean> {
    return await argon2.verify(hashedText, text)
  }

  private generatePassword(): string {
    let password = ''

    for (let i = 0; i < 13; i++) {
      const randomNumber = Math.floor(Math.random() * 94) + 33
      password += String.fromCharCode(randomNumber)
    }

    return password
  }

  private validatePassword(password): boolean {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialCharacters = /[!@#\$%\^&\*]/.test(password)

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters
  }

  securePassword() {
    let password = this.generatePassword()

    while (!this.validatePassword(password)) {
      password = this.generatePassword()
    }

    return password
  }
}
