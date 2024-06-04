"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { encryptMessage } from "@/utils/symmetric";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";

import app from "@/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword as signup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SignUp() {
  const router = useRouter();

  const auth = getAuth(app);

  async function handleSignup(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const encrypt_key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "secret";

    const userCredential = signup(auth, email, password);

    const user = await toast.promise(userCredential, {
      loading: "Signing up...",
      success: () => {
        router.push("/chat");
        return "Signed up successfully";
      },
      error: (err: FirebaseError) => {
        return "Failed to sign up: " + err.message;
      },
    });

    console.log(user);

    localStorage.setItem("privateKey", privateKey);
  }

  return <Sign_in_up type="Sign up" handleSubmit={handleSignup} />;
}
