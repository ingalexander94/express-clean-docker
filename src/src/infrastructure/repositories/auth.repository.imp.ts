import {
  AuthDatasource,
  AuthRepository,
  LoginUserDTO,
  UserEntity,
} from "domains";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDTO);
  }
}
