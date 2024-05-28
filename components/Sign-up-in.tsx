import { useState } from "react";

interface SignInUpProps {
  type: "Sign in" | "Sign up";
  handleSubmit: (email: string, password: string) => void;
}

export default function Sign_in_up({ type, handleSubmit }: SignInUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="full-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(email, password);
      }}
    >
      <div className="flex flex-col space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="px-4 py-2 btn btn-neutral text-xl font-bold rounded-lg">
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
      </div>
    </form>
  );
}
