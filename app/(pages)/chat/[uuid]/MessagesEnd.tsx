"use client";

import { Message } from "@/types";
import { useEffect, useRef } from "react";

export default function MessagesEnd({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }
  // , [messages]
);

  return <div ref={messagesEndRef} />;
}
