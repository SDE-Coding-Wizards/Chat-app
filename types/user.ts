import { UUID } from "./uuid";
export interface User extends CreateUser {
  uuid: UUID;
  firstname?: string;
  lastname?: string;
  image_path?: string;
  bio?: string;
  status_id: number;
}
export interface CreateUser {
  email: string;
  password: string;
  public_key: string;
  //! DONT DO THIS NORMALLY
  private_key: string;
}

export interface ChatAuthor {
  uuid: UUID;
  firstname?: string;
  lastname?: string;
  image_path?: string;
  status_id: number;
}
