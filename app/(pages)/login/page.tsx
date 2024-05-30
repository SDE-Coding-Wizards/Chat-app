"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";

export default function login() {
  async function handleLogin(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const promise = axios.post("/api/auth/signin", {
      email,
      password,
    });

    // Toaster library for message boxes
    toast.promise(promise, {
      loading: "Signing in...",
      success: () => {
        // redirect logic
        return "Signed in successfully"
      },
      error: () => {
        // error logic
        return "Failed to sign in"
      },
    });

    // localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign in" handleSubmit={handleLogin} />;
}
