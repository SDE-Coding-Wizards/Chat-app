"use client";
import { Trash2 } from 'lucide-react';

export default function DeleteGroup({
  uuid
}: any) {



  return (
    <button className="icon-button" onClick={() => console.log("Group chat deleted", uuid)}>
      <Trash2 className="mt-1" />
    </button>
  );

}
