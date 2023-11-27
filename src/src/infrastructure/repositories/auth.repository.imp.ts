import {
  AuthDatasource,
  AuthRepository,
  ForgotPasswordDTO,
  LoginUserDTO,
  NewPasswordDTO,
  UserEntity,
} from "domains";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDTO);
  }

  forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<number> {
    return this.authDatasource.forgotPassword(forgotPasswordDTO);
  }

  newPassword(newPasswordDTO: NewPasswordDTO): Promise<boolean> {
    return this.authDatasource.newPassword(newPasswordDTO);
  }
}
