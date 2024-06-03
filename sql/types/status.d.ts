declare namespace status {
  export interface referencing {}

  export interface referenced {
    users: user[];
  }
}

interface status extends status.referencing, status.referenced {
  id: number;
  name: string;
}
