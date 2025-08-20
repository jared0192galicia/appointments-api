import type { Token } from '../types/auth';
import { jwtVerify, importJWK, decodeJwt, SignJWT } from 'jose';

export async function createToken(payload: Token, secret: any): Promise<string> {
  const privateKey = await importJWK(secret, 'HS256');
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(privateKey);
}

export interface AuthSecret {
  kty: string;
  k: string;
}

export function getAuthSecret(token: string): AuthSecret {
  return {
    kty: 'oct',
    k: Buffer.from(token).toString('base64'),
  };
}

export function decodeToken(token: string): any {
  try {
    const decoded = decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function verify(token: string, key: any) {
  try {
    const secretKey = await importJWK(key, 'HS256');
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
