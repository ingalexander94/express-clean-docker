import { JWTAdapter } from "config";
import { RegisterUserDTO } from "domains/dtos/auth/register-user.dto";
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

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDTO: RegisterUserDTO): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JWTAdapter.generateToken
  ) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDTO);
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");
    const { id, email, name } = user;
    return { token, user: { id, email, name } };
  }
}
