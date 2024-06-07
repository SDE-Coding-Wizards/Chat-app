"use client";

import ProfilePic from "@/components/ProfilePic";
import { getUsers } from "@/functions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  if (tab !== "online") return null;

  return (
    <div className="flex flex-col  bg-base-100 p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Online Users</h1>
      <p className="mb-6 text-lg">List of users who are currently online.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {users.map((user) => (
          <div
            key={user.uuid}
            className="flex items-center p-4 bg-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ProfilePic initialUser={user} />
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </p>

              <StatusIcon status_id={user.status_id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
