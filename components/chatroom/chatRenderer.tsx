import { Message, User } from "@/types";
import { EmojiHandler } from "./handlers/emojiHandler";
import { GifHandler } from "./handlers/gifHandler";
import { ImageHandler } from "./handlers/imageHandler";
import { TextHandler } from "./handlers/textHandler";
import { isCurrentUser } from "@/utils/chatBubblePossitioner";
export const ChatRenderer: React.FC<{
  data: Message[];
  chatKey: string;
  currentUser: User;
}> = ({ data, chatKey, currentUser }) => {
  const imageHandler = new ImageHandler();
  const gifHandler = new GifHandler();
  const textHandler = new TextHandler();
  const emojiHandler = new EmojiHandler();

  imageHandler.setNext(gifHandler).setNext(textHandler).setNext(emojiHandler);

  return (
    <div className="flex flex-col gap-1 w-full">
      {data.map((message, index) => (
        <div key={index}>
          {imageHandler.handle({
            ...message,
            chatKey,
            isCurrentUser: isCurrentUser(currentUser, message),
          }) || (
            <div>
              <div role="alert" className="alert alert-error w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Error displaying this message.</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
