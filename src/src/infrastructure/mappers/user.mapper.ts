import { CustomError, UserEntity } from "domains";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, email, password } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");

    return new UserEntity(id, name, email, password);
  }
}
