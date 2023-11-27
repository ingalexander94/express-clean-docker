import { Validators } from "config";

export class ForgotPasswordDTO {
  private constructor(public user_email: string) {}

  static create(object: { [key: string]: any }): [string?, ForgotPasswordDTO?] {
    const { user_email } = object;
    if (!user_email) return ["Missing user_email"];
    if (!Validators.email.test(user_email)) return ["user_email is not valid"];
    return [undefined, new ForgotPasswordDTO(user_email)];
  }
}
