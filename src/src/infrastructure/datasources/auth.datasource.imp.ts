import { BcryptAdapter } from "config";
import { UserModel } from "data";
import {
  AuthDatasource,
  CustomError,
  LoginUserDTO,
  RegisterUserDTO,
  UserEntity,
} from "domains";
import { UserMapper } from "infrastructure/mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    try {
      const { email, password } = loginUserDTO;
      const user = await UserModel.findOne({ where: { email } });
      if (!user) throw CustomError.badRequest("User does not exists");
      const isMatching = this.comparePassword(
        password,
        user.dataValues.password
      );
      if (!isMatching) throw CustomError.badRequest("Password is not valid");
      return UserMapper.userEntityFromObject(user.dataValues);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else throw CustomError.internalServer();
    }
  }

  async register(registerUserDTO: RegisterUserDTO): Promise<UserEntity> {
    try {
      const { name, email, password } = registerUserDTO;
      const exist = await UserModel.findOne({ where: { email } });
      if (exist) throw CustomError.badRequest("User already exists");
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });
      return UserMapper.userEntityFromObject(user.dataValues);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else throw CustomError.internalServer();
    }
  }
}
