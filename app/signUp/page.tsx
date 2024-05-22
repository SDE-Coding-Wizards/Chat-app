export default function SignUp() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 bg-slate-700 text-white text-xl font-bold rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 bg-slate-700 text-white text-xl font-bold rounded-lg"
        />
        <input
        type="email"
        placeholder="Email"
        className="px-4 py-2 bg-slate-700 text-white text-xl font-bold rounded-lg">
        </input>
        <button className="flex items-center justify-center px-4 py-2 bg-slate-700 text-white text-xl font-bold rounded-lg hover:bg-violet-500 transition-colors">
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
          Sign in with Google
        </button>
        <button className="px-4 py-2 bg-violet-500 text-black text-xl font-bold rounded-lg">
          Sign Up
        </button>
      </div>
    </main>
  );
}
