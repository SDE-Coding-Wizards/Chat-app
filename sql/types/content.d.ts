declare namespace content {
  export interface referencing {
    content_type: content_type;
  }

  export interface referenced {
    messages: message[];
  }
}

interface content extends content.referencing, content.referenced {
  uuid: UUID;
  content_type_id: content_type["uuid"];
  content: string;
}
