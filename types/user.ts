import { UUID } from "./uuid";
export interface User extends CreateUser {
  uuid: UUID;
  firstname?: string;
  lastname?: string;
  image_path?: string;
  bio?: string;
  public_key: string;

  //! DONT DO THIS NORMALLY
  private_key?: string;
}
export interface CreateUser {
  email: string;
  password: string;
  status_id: number;
}
