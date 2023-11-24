import { CustomError, RoleEntity } from "domains";

export class RoleMapper {
  static roleEntityFromObject(object: { [key: string]: any }): RoleEntity {
    const { id_role, role_name, role_state, role_description } = object;

    if (!id_role) throw CustomError.badRequest("Missing id_role");
    if (!role_name) throw CustomError.badRequest("Missing role_name");
    if (!role_description)
      throw CustomError.badRequest("Missing role_description");

    return new RoleEntity(id_role, role_name, role_description, role_state);
  }
}
