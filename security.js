import { createHmac, randomBytes } from 'crypto';

export class Security {
  static getSecretKey() {
    const secretKey = randomBytes(32).toString('hex');
    return secretKey;
  }
  static getHMAC(secretKey, message) {
    return createHmac('sha256', secretKey).update(message).digest('hex');
  }
}
