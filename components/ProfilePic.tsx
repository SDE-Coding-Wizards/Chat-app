import { getUser } from "@/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePic() {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  return (
    <Image
      className="rounded-3xl mx-2"
      src={user?.image_path || "/default.webp"}
      alt="Profile Picture"
      width={50}
      height={50}
    />
  );
}
