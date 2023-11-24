import { RoleEntity } from "./role.entity";

export class UserEntity {
  constructor(
    public id_user: number,
    public user_names: string,
    public user_surnames: string,
    public user_email: string,
    public user_password: string,
    public user_state: number,
    public roles: RoleEntity[],
    public user_phone: string | null,
    public user_photo: string | null
  ) {}
}
