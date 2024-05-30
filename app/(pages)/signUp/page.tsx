"use client";

import { encryptMessage } from "@/utils/symmetric";
import { generateKeys } from "@/utils/keyPair";
import axios from "axios";
import Sign_in_up from "@/components/Sign-up-in";

export default function SignUp() {
  async function handleSignup(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "secret";

    // const { content, iv } = encryptMessage(privateKey, key);

    const { data: newUser } = await axios.post("/api/auth/signup", {
      email,
      password,
      publicKey,
      //! DONT DO THIS IN NORMALLY
      privateKey,
    });

    localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign up" handleSubmit={handleSignup} />;
}
