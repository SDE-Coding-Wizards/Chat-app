"use client";

import { useState } from "react";
import axios from "axios";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";

export default function login() {
  async function handleLogin(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const response = await axios.post("/api/auth/signin", {
      email,
      password,
    });

    // localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign in" handleSubmit={handleLogin} />;
}
