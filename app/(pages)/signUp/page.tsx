"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { encryptMessage } from "@/utils/symmetric";
import { generateKeys } from "@/utils/keyPair";
import Sign_in_up from "@/components/Sign-up-in";
import { createUser } from "@/functions/createUser";

import app from "@/firebase";
import {
  User,
  getAdditionalUserInfo,
  getAuth,
  createUserWithEmailAndPassword as signup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { setCookie } from "@/helpers/setCookie";

export default function SignUp() {
  const router = useRouter();

  const auth = getAuth(app);

  async function handleSignup(email: string, password: string) {
    if (!email || !password) return;

    const { privateKey, publicKey } = await generateKeys();

    const encrypt_key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "secret";

    const userCredential = await toast.promise(signup(auth, email, password), {
      loading: "Signing up...",
      success: "Signed up successfully",
      error: (err: FirebaseError) => {
        return "Failed to sign up: " + err.message;
      },
    });

    const userInfo = getAdditionalUserInfo(userCredential)!;

    const dbUser = {
      uuid: userCredential.user?.uid as UUID,
      email: userCredential.user.email!,
      firstname: userInfo.profile?.given_name,
      lastname: userInfo.profile?.family_name,
      public_key: publicKey,
      private_key: privateKey,
    } as user;

    await createUser(dbUser);

    const user = userCredential.user as User & { accessToken: string };

    setCookie("token", user.accessToken);
  }

  return <Sign_in_up type="Sign up" handleSubmit={handleSignup} />;
}
