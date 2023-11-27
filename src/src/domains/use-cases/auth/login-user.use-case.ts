import { JWTAdapter } from "config";
import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { CustomError } from "domains/errors/custom.error";
import { AuthRepository } from "domains/repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id_user: number;
    user_names: string;
    user_surnames: string;
    user_email: string;
    user_state: number;
    roles: { [key: string]: any }[];
  };
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDTO: LoginUserDTO): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JWTAdapter.generateToken
  ) {}

  async execute(loginUserDTO: LoginUserDTO): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDTO);
    const token = await this.signToken({ id: user.id_user }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");
    const {
      id_user,
      user_email,
      user_names,
      user_surnames,
      user_state,
      roles,
    } = user;
    const dataRoles = roles.map(({ id_role, role_name, role_state }) => ({
      id_role,
      role_name,
      role_state,
    }));
    return {
      token,
      user: {
        id_user,
        user_names,
        user_surnames,
        user_email,
        user_state,
        roles: dataRoles,
      },
    };
  }
}
