import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { UserEntity } from "domains/entities/user.entity";

export abstract class AuthDatasource {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}
