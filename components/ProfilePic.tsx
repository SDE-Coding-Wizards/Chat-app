"use client";

import { getUser } from "@/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfilePicProps {
  initialUser?: user | null;
}

export default function ProfilePic({ initialUser = null }: ProfilePicProps) {
  const [user, setUser] = useState<user | null>(initialUser);

  useEffect(() => {
    if (user) return;

    getUser().then(setUser);
  }, []);

  return (
    <div>
      <Image
        className="rounded-3xl mx-2 h-12 w-12"
        src={user?.image_path || "/default.webp"}
        alt="Profile Picture"
        width={50}
        height={50}
      />
    </div>
  );
}
