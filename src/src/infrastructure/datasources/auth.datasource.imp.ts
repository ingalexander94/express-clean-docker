import { CryptoAdapter } from "config";
import { UserModel, RoleModel } from "data";
import { AuthDatasource, CustomError, LoginUserDTO, UserEntity } from "domains";
import { RoleMapper } from "../mappers/role.mapper";
import { UserMapper } from "../mappers/user.mapper";

type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly comparePassword: CompareFunction = CryptoAdapter.compare
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    try {
      const { user_email, user_password } = loginUserDTO;
      const user = await UserModel.findOne({
        where: { user_email },
        include: [
          {
            model: RoleModel,
            as: "RoleModel",
            where: {
              role_state: 1,
            },
            required: false,
          },
        ],
      });
      if (!user) throw CustomError.badRequest("User does not exists");
      const isMatching = this.comparePassword(
        user_password,
        user.dataValues.user_password
      );
      if (!isMatching) throw CustomError.badRequest("Password is not valid");

      const roles = user.RoleModel.map((role) =>
        RoleMapper.roleEntityFromObject(role)
      );

      return UserMapper.userEntityFromObject({ ...user.dataValues, roles });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      else throw CustomError.internalServer();
    }
  }
}
