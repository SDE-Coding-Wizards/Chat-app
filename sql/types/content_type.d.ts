declare namespace content_type {
  export interface referencing {}

  export interface referenced {
    contents: content[];
  }
}

interface content_type extends content_type.referencing, content_type.referenced {
  id: number;
  name: string;
}
