import Link from "next/link";

export default function Chat() {
  return (
    <main className="flex min-h-screen bg-base-100">
      <aside className="w-1/4 h-screen bg-base-200 p-4">
        <h2 className="text-lg font-bold mb-4">Recent Chats</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-base-300 rounded ">
            <Link href="/">Chat</Link>
          </li>
          <li className="p-2 bg-base-300 rounded">
            <Link href="/">Chat</Link>
          </li>
          <li className="p-2 bg-base-300 rounded">
            <Link href="/">Chat</Link>
          </li>
        </ul>
      </aside>
      <section className="flex-1 h-screen p-4">
        <div className="flex flex-col h-full bg-base-100 border border-base-300 rounded-lg p-4">
          <div className="flex-1">
            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type a message"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
