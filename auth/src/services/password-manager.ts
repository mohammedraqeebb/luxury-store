import bcrypt from 'bcrypt';

export class PasswordManager {
  static async hashPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  }
  static async comparePassword(inputPassword: string, hashedPassword: string) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
