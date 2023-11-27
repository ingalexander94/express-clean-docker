export class NewPasswordDTO {
  private constructor(public id_user: number, public user_password: string) {}

  static create(object: { [key: string]: any }): [string?, NewPasswordDTO?] {
    const { id_user, user_password } = object;
    if (!id_user) return ["missing id_user"];
    if (!user_password) return ["missing user_password"];
    if (user_password.length < 6) return ["user_password too short"];
    return [undefined, new NewPasswordDTO(id_user, user_password)];
  }
}
