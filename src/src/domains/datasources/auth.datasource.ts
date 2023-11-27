import { ForgotPasswordDTO } from "domains/dtos/auth/forgot-password.dto";
import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { NewPasswordDTO } from "domains/dtos/auth/new-password.dto";
import { UserEntity } from "domains/entities/user.entity";

export abstract class AuthDatasource {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
  abstract forgotPassword(
    forgotPasswordDTO: ForgotPasswordDTO
  ): Promise<number>;
  abstract newPassword(newPasswordDTO: NewPasswordDTO): Promise<boolean>;
}
