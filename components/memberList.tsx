"use client";

import React, { useState } from "react";
import { User as Usericon } from "lucide-react";

export default function MemberList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <button
        className="w-10 h-10 flex items-center justify-center"
        // style={{ position: "absolute", top: 10, left: 10 }}
        onClick={toggleSidebar}
      >
        <Usericon size={24} />
      </button>
      <div
        className={`w-64 max-h-64 shadow-md ${
          sidebarOpen ? " right-0" : "hidden"
        }`}
        // style={{ position: "absolute", top: 0, right: 0 }}
      >
        <nav className="text-base font-semibold">
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Mikkel
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Halfdan
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Nima
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Ikhvan
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Nima
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Ikhvan
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Nima
          </a>
          <a
            href="#"
            className="border-b border-gray-300 block p-4 hover:bg-base-200"
          >
            Ikhvan
          </a>
        </nav>
      </div>
    </div>
  );
}
