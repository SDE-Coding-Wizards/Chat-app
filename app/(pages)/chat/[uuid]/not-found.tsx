import Link from "next/link";

export default function NotFound() {
  return (
    <div className="full-center flex-col">
      <h1>Not Found</h1>
      <Link href="/chat">Back to safety</Link>
    </div>
  );
}
