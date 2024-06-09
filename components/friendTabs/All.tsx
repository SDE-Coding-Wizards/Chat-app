"use client";

import { useSearchParams } from "next/navigation";

export default function All() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  if (tab !== "all") return null;
  return (
    <div className="flex flex-col bg-base-100 p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <p>List of All users.</p>
    </div>
  );
}
