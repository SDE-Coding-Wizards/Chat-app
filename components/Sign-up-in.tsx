import { useEffect, useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { setCookie } from "@/helpers/setCookie";

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  UserCredential,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { getUsers, createUser } from "@/functions";
import { generateKeys } from "@/utils/keyPair";
import { useRouter } from "next/navigation";
import { getUser } from "@/helpers";
import Loading from "./Loading";

interface SignInUpProps {
  type: "Sign in" | "Sign up";
  handleSubmit: (
    email: string,
    password: string,
    userCred?: UserCredential
  ) => Promise<any>;
}

export default function SignInUp({ type, handleSubmit }: SignInUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      const dbUser = await getUser();

      if (authUser && dbUser) router.push("/chat");

      setIsLoaded(!Boolean(authUser && dbUser));
    });
  }, [router]);

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(auth, provider);

    const user = userCredential.user as User & { accessToken: string };

    setCookie("token", user.accessToken);

    const [findUser] = await getUsers({ filter: { email: user.email } });

    if (findUser) return router.push("/chat");

    const { privateKey, publicKey } = await generateKeys();

    const userInfo = getAdditionalUserInfo(userCredential)!;

    createUser({
      uuid: user.uid as UUID,
      email: user.email!,
      firstname: userInfo.profile?.given_name,
      lastname: userInfo.profile?.family_name,
      image_path: userInfo.profile?.picture,
      private_key: privateKey,
      public_key: publicKey,
    } as user);

    router.push("/chat");
  }

  if (!isLoaded) return <Loading />;

  return (
    <form
      className="full-center"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        await handleSubmit(email, password);
      }}
    >
      <div className="flex flex-col space-y-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <Mail size={20} />
            <input
              type="text"
              className={"grow"}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <KeyRound size={20} />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <button
          className="px-4 py-2 btn btn-neutral text-xl font-bold rounded-lg"
          onClick={handleGoogleSignIn}
          type="button"
        >
          <div className="bg-white rounded-full p-1 mr-3">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M23.64 12.2045C23.64 11.362 23.5731 10.7695 23.4309 10.1573H12V13.8441H18.6482C18.5059 14.8796 17.835 16.5487 16.3446 17.5147L16.3232 17.6475L19.6614 20.0616L19.8941 20.0836C22.2082 17.9277 23.64 15.2107 23.64 12.2045Z"
              />
              <path
                fill="#34A853"
                d="M12 24C15.24 24 17.8864 22.982 19.8941 20.0836L16.3446 17.5147C15.2986 18.2327 13.8627 18.6714 12 18.6714C8.85727 18.6714 6.23818 16.6098 5.28182 13.7682L5.15455 13.7782L1.69636 16.2675L1.64636 16.3909C3.64 20.3882 7.54545 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28182 13.7682C5.04545 13.1559 4.90909 12.4987 4.90909 11.8182C4.90909 11.1377 5.04545 10.4805 5.28182 9.86818L5.27273 9.72636L1.77273 7.20455L1.64636 7.24545C0.858182 8.83227 0.363636 10.6609 0.363636 12.6818C0.363636 14.7027 0.858182 16.5314 1.64636 18.1182L5.28182 13.7682Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.63636C14.1636 4.63636 15.6545 5.47818 16.4909 6.27273L19.9636 2.90909C17.8864 1.16364 15.24 0 12 0C7.54545 0 3.64 3.61182 1.64636 7.24545L5.28182 9.86818C6.23818 7.02655 8.85727 4.63636 12 4.63636Z"
              />
            </svg>
          </div>
          {type} with Google
        </button>
        <button
          className="px-4 py-2 btn btn-neutral text-xl font-bold rounded-lg"
          type="submit"
        >
          {type}
        </button>
        <div className="flex flex-col gap-4">
          {type === "Sign up" && (
            <>
              <a
                href="/login"
                className="no-underline hover:text-white transition duration-500 ease-in-out flex flex-col items-center justify-center"
              >
                Already have an account? Sign in
              </a>
            </>
          )}
          {type === "Sign in" && (
            <>
              <a
                href="/forgot-password"
                className="no-underline hover:text-white transition duration-500 ease-in-out flex flex-col items-center justify-center"
              >
                Forgot password?
              </a>
              <a
                href="/signUp"
                className="no-underline hover:text-white transition duration-500 ease-in-out flex flex-col items-center justify-center"
              >
                Don&apos;t have an account? Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
