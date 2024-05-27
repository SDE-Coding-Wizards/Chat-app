export async function generateKeys() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: "SHA-256" },
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKey = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );
  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  return {
    publicKey: convertToPEM(publicKey, "PUBLIC KEY"),
    privateKey: convertToPEM(privateKey, "PRIVATE KEY"),
  };
}

function convertToPEM(
  keyData: ArrayBuffer,
  keyType: "PUBLIC KEY" | "PRIVATE KEY"
) {
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(keyData)));
  const key = base64Key.match(/.{1,64}/g)!.join("\n");
  const pemKey = `-----BEGIN ${keyType}-----\n${key}\n-----END ${keyType}-----`;

  return pemKey;
}

// import { generateKeyPairSync } from "crypto";

// export function generateKeys() {
//   const { privateKey, publicKey } = generateKeyPairSync("rsa", {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: "spki",
//       format: "pem",
//     },
//     privateKeyEncoding: {
//       type: "pkcs8",
//       format: "pem",
//     },
//   });

//   return { privateKey, publicKey };
// }
