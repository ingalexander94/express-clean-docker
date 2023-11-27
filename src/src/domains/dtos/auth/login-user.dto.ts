import { Validators } from "config";

export class LoginUserDTO {
  private constructor(
    public user_email: string,
    public user_password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { user_email, user_password } = object;
    if (!user_email) return ["Missing user_email"];
    if (!Validators.email.test(user_email)) return ["user_email is not valid"];
    if (!user_password) return ["missing user_password"];
    if (user_password.length < 6) return ["user_password too short"];
    return [undefined, new LoginUserDTO(user_email, user_password)];
  }
}
