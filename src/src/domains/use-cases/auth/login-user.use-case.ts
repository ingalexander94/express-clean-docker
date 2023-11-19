import { JWTAdapter } from "config";
import { LoginUserDTO } from "domains/dtos/auth/login-user.dto";
import { CustomError } from "domains/errors/custom.error";
import { AuthRepository } from "domains/repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
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
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");
    const { id, email, name } = user;
    return { token, user: { id, email, name } };
  }
}
