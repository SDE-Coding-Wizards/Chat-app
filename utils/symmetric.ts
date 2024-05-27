import {
  CipherKey,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "crypto";

const algorithm = "aes-256-cbc";

export function encryptMessage(message: string, chatKey: string) {
  const iv = randomBytes(16);

  const buffer: CipherKey = Buffer.from(chatKey, "hex");

  const cipher = createCipheriv(algorithm, buffer, iv);

  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    content: {
      content: encrypted,
    },
  };
}

export function decryptMessage(
  encryptedMessage: string,
  chatKey: string,
  iv: string
) {
  const decipher = createDecipheriv(
    algorithm,
    Buffer.from(chatKey, "hex"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
