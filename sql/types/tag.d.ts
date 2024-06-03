declare namespace tag {
  export interface referencing {}

  export interface referenced {
    user_tags: user_tag[];
  }
}

interface tag extends tag.referencing, tag.referenced {
  id: number;
  name: string;
}
