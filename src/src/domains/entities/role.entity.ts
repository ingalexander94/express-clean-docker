export class RoleEntity {
  constructor(
    public id_role: number,
    public role_name: string,
    public role_description: string | null,
    public role_state: number
  ) {}
}
