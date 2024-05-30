export default function profileSettings() {


    return (
        <div className="text-center mt-5">
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <img
                        src="/default.webp"
                        alt="Profile Picture"
                        className="rounded-full w-32 h-32"
                    />
                    <button className="btn btn-neutral mt-2">Change Picture</button>
                </div>
                <div className="flex flex-col items-start ml-5">
                    <label htmlFor="username" className="text-lg">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="input input-primary w-64"
                        placeholder="Username"
                    />
                    <label htmlFor="email" className="text-lg mt-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="input input-primary w-64"
                        placeholder="Email"
                    />
                    <label htmlFor="password" className="text-lg mt-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input input-primary w-64"
                        placeholder="Password"
                    />
                    <button className="btn mt-2">Save</button>
                </div>
            </div>
        </div>
    );
}
