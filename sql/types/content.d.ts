interface content {
  uuid: UUID;
  content_type_id: content_type["uuid"];
  content: string;

  content_type: content_type;

  messages: message[];
}
