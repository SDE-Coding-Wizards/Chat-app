import { GifComponent } from "../handlerComponents/gitHandler";
import { Message } from "@/types/message";
import { AbstractHandler } from "./baseHandler";

export class GifHandler extends AbstractHandler {
  public handle(message: Message): JSX.Element | null {
    if (message.content?.content_type_id === 4) {
      if (message.content?.content) {
        const filename = message.content?.content.split("/").pop();
        return (
          <GifComponent
            alt={filename || "gif"}
            image={message.content.content}
          />
        );
      }
    }
    return super.handle(message);
  }
}
