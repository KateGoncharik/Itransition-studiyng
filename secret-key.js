import { randomBytes } from 'crypto';

export class SecretKey {
  static getSecretKey() {
    const secretKey = randomBytes(32).toString('hex');
    return secretKey;
  }
}
