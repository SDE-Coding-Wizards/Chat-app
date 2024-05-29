import { Message } from "@/types/message";

import { AbstractHandler } from "./baseHandler";
import { ImageComponent } from "../handlerComponents/imageHandler";

export class ImageHandler extends AbstractHandler {
  public handle(message: Message): JSX.Element | null {
    if (message.content?.content_type_id === 3 && message.content?.content) {
      const filename = message.content?.content.split("/").pop();

      return (
        <ImageComponent
          image={message.content.content}
          alt={filename || "img"}
        />
      );
    }
    return super.handle(message);
  }
}
