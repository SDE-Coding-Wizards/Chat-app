import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="h-16 px-6 bg-slate-700 text-white shadow-md flex items-center justify-center">
            <div className="items-center justify-between">
                    <Link href="/" legacyBehavior>
                        <a className="text-white font-bold text-3xl rounded-md hover:bg-violet-600 transition-colors duration-200 px-3 py-2">Home</a>
                    </Link>
            </div>
        </nav>
    );
}
