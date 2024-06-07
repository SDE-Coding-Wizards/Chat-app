"use client";
import { Trash2 } from 'lucide-react';

export default function DeleteGroup() {



  return (
    <button className="icon-button" onClick={() => console.log("Group chat deleted")}>
      <Trash2 className="mt-1" />
    </button>
  );

}
