export const EmojiComponent: React.FC<{ text: string }> = ({ text }) => (
  <div className="chat chat-start ">
    <p className="chat-bubble text-3xl">{text}</p>
  </div>
);
