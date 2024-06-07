"use client";

import ProfilePic from "@/components/ProfilePic";
import { getUsers } from "@/functions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Users = [
  {
    uuid: "1",
    firstname: "John",
    lastname: "Doe",
  },
  {
    uuid: "2",
    firstname: "Jane",
    lastname: "Doe",
  },
  {
    uuid: "3",
    firstname: "Alice",
    lastname: "Doe",
  },
  {
    uuid: "4",
    firstname: "Bob",
    lastname: "Doe",
  },
  {
    uuid: "5",
    firstname: "Eve",
    lastname: "Doe",
  },
  {
    uuid: "5",
    firstname: "Eve",
    lastname: "Doe",
  },
  {
    uuid: "5",
    firstname: "Eve",
    lastname: "Doe",
  },
];

const handleAccept = (uuid: string) => {
  console.log("Accepted", uuid);
};

const handleReject = (uuid: string) => {
  console.log("Rejected", uuid);
};

export default function Pending() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    setUsers(Users);
  }, []);
  if (tab !== "pending") return null;

  return (
    <div className="flex flex-col bg-base-100 p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Pending Users</h1>
      <p className="mb-6 text-lg">List of users who are currently pending.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {users.map((user) => (
          <div
            key={user.uuid}
            className="flex items-center sm:flex-row p-4 bg-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ProfilePic initialUser={user} />
            <div className="ml-4">
              <p className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </p>
              <div className="flex justify-center space-x-4 ">
                <button
                  onClick={() => handleAccept(user.uuid)}
                  className="btn btn-success px-4 py-2 rounded-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(user.uuid)}
                  className="btn btn-warning px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
