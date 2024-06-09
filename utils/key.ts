import { privateDecrypt, publicEncrypt, randomBytes } from "crypto";

export function generateKey() {
  return randomBytes(32).toString("hex");
}

export function encryptKey(decryptedKey: string, publicKey: string) {
  const buffer = Buffer.from(decryptedKey, "hex");

  const encrypted = publicEncrypt(publicKey, buffer);

  return encrypted.toString("base64");
}

export function decryptKey(encryptedKey: string, privateKey: string) {
  const buffer = Buffer.from(encryptedKey, "base64");

  const decrypted = privateDecrypt(privateKey, buffer);

  return decrypted.toString("hex");
}
