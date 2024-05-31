export interface Content {
  uuid: string;
  content_type_id: number;
  content: string;
}

export enum ContentType {
  TEXT = 1,
  IMAGE = 2,
  EMOJI = 3,
  AUDIO = 4,
  GIF = 5,
  FILE = 6,
}
