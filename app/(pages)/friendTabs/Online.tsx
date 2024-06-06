"use client";

import ProfilePic from "@/components/ProfilePic";
import { useSearchParams } from "next/navigation";

const onlineUsers = [
  {
    uuid: "1" as any,
    firstname: "John",
    lastname: "Doe",
    status_id: "1",
  },
  {
    uuid: "2" as any,
    firstname: "Jane",
    lastname: "Doe",
    status_id: "1",
  },
  {
    uuid: "3" as any,
    firstname: "Alice",
    lastname: "Doe",
    status_id: "2",
  },
  {
    uuid: "4" as any,
    firstname: "Bob",
    lastname: "Doe",
    status_id: "2",
  },
  {
    uuid: "4" as any,
    firstname: "Bob",
    lastname: "Doe",
    status_id: "2",
  },
  {
    uuid: "4" as any,
    firstname: "Bob",
    lastname: "Doe",
    status_id: "2",
  },
] as user[];

const StatusIcon = ({ status_id }: any) => {
  const isOnline = status_id === "1";
  return (
    <div
      className={`h-3 w-3 rounded-full ${
        isOnline ? "bg-green-500" : "bg-gray-400"
      }`}
    />
  );
};

export default function Online() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  if (tab !== "online") return null;

  return (
    <div className="flex flex-col  bg-base-100 p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Online Users</h1>
      <p className="mb-6 text-lg">List of users who are currently online.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {onlineUsers.map((user) => (
          <div
            key={user.uuid}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ProfilePic initialUser={user} />
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </p>
              <p>
                <StatusIcon status_id={user.status_id} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
