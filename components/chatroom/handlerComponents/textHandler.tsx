export const TextComponent: React.FC<{ text: string }> = ({ text }) => (
  <div className="chat chat-start">
    <p className="chat-bubble">{text}</p>
  </div>
);
