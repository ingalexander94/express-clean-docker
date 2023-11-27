import { JWTAdapter } from "config";
import { CustomError } from "domains/errors/custom.error";

interface UserToken {
  id_user: number;
  user_names: string;
  user_surnames: string;
  user_email: string;
  roles: { [key: string]: any }[];
}

interface Token {
  token: string;
  user: UserToken;
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface RenewTokenUseCase {
  execute(): Promise<Token>;
}

export class RenewToken implements RenewTokenUseCase {
  constructor(
    private readonly userToken: UserToken,
    private readonly signToken: SignToken = JWTAdapter.generateToken
  ) {}

  async execute(): Promise<Token> {
    const token = await this.signToken({ id: this.userToken.id_user }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");
    return {
      token,
      user: this.userToken,
    };
  }
}
