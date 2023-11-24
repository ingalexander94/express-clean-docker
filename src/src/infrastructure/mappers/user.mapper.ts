import { CustomError, UserEntity } from "domains";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const {
      id_user,
      user_names,
      user_surnames,
      user_email,
      user_password,
      user_photo,
      user_phone,
      user_state,
      roles,
    } = object;

    if (!id_user) throw CustomError.badRequest("Missing id_user");
    if (!user_email) throw CustomError.badRequest("Missing user_email");
    if (!user_password) throw CustomError.badRequest("Missing user_password");

    return new UserEntity(
      id_user,
      user_names,
      user_surnames,
      user_email,
      user_password,
      user_state,
      roles,
      user_phone,
      user_photo
    );
  }
}
