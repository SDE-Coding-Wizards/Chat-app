"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";
import { setCookie } from "@/helpers/setCookie";

import { signInWithEmailAndPassword as signin } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase";

export default function login() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const userCredential = signin(auth, email, password);

    const user = await toast.promise(userCredential, {
      loading: "Signing in...",
      success: () => {
        // router.push("/chat");
        return "Signed in successfully";
      },
      error: (err: FirebaseError) => {
        return "Failed to sign up: " + err.message;
      },
    });

    const user2 = user.user as any;
    setCookie("token", user2.accessToken);

    // localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign in" handleSubmit={handleLogin} />;
}
