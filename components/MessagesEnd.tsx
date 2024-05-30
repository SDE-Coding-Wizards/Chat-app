"use client";

import { useEffect, useRef } from "react";

export default function MessagesEnd() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return <div ref={messagesEndRef} />;
}
