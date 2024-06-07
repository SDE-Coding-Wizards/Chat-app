"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";
import { setCookie } from "@/helpers/setCookie";

import { User, signInWithEmailAndPassword as signin } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase";

export default function login() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const userCredential = await toast.promise(signin(auth, email, password), {
      loading: "Signing in...",
      success: () => {
        // router.push("/chat");
        return "Signed in successfully";
      },
      error: (err: FirebaseError) => {
        return "Failed to sign up: " + err.message;
      },
    });

    const user = userCredential.user as User & { accessToken: string };

    setCookie("token", user.accessToken);

    // localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign in" handleSubmit={handleLogin} />;
}
