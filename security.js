import { createHmac, randomBytes } from 'crypto';

export class Security {
  static getSecretKey() {
    return randomBytes(32).toString('hex');
  }
  static getHMAC(secretKey, message) {
    return createHmac('sha256', secretKey).update(message).digest('hex');
  }
}
