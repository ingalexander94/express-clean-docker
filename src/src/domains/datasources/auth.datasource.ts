import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { RegisterUserDTO } from "domains/dtos/auth/register-user.dto";
import { UserEntity } from "domains/entities/user.entity";

export abstract class AuthDatasource {
  abstract register(regiterUserDTO: RegisterUserDTO): Promise<UserEntity>;
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}
