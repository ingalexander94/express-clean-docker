import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { UserEntity } from "domains/entities/user.entity";

export abstract class AuthRepository {
  abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>;
}
