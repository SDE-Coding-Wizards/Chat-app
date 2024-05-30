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
                    <button className="btn btn-neutral mt-3">Change Picture</button>
                </div>
                <div className="flex flex-col items-start ml-5 mt-5">
                    <label className="text-lg mt-5">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="input input-primary w-64"
                        placeholder="Email"
                    />
                    <label className="text-lg mt-5">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input input-primary w-64"
                        placeholder="Password"
                    />
                    <label className="text-lg mt-5">Bio</label>
                    <textarea
                        id="bio"
                        className="input input-primary w-64"
                        placeholder="Tell us about yourself"
                    />
                    <button className="btn mt-7 w-64">Save & Update</button>
                </div>
            </div>
        </div>
    );
}
