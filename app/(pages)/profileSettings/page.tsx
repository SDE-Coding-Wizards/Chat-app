export default function ProfileSettings() {

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
                    <label className="text-lg mt-5">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        className="input input-primary w-64"
                        placeholder="First Name"
                    />
                    <label className="text-lg mt-5">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="input input-primary w-64"
                        placeholder="Last Name"
                    />
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
                    <div className="flex items-center">
                        <textarea
                            id="bio"
                            className="textarea textarea-primary resize-none w-64 py-auto"
                            placeholder="Tell us about yourself"
                        />
                    </div>
                    <button className="btn mt-7 w-64">Save & Update</button>
                    <button className="btn btn-neutral mt-3 w-64">Sign Out</button>
                </div>
            </div>
        </div>
    );
}
