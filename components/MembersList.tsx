"use client";

import React, { useState } from "react";
import { User as Usericon } from "lucide-react";

interface MembersListProps {
  members: chatroom_member[];
}

export default function MembersList({ members }: MembersListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <button
        className="w-10 h-10 flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <Usericon size={24} />
      </button>
      <div
        className={`w-64 max-h-64 shadow-md ${
          sidebarOpen ? " right-0" : "hidden"
        }`}
      >
        <div className="text-base font-semibold">
          {members.map((member) => (
            <button className="border-b border-gray-300 block p-4 hover:bg-base-200">
              {member.user.firstname}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
