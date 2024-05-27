import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <h1>Not Found</h1>
      <Link href="/chat">Back to safety</Link>
    </div>
  );
}
