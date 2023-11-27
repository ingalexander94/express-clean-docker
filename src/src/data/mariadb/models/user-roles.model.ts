import { DataTypes, Model } from "sequelize";
import { mariadb } from "../mariadb-database";
import { UserModel } from "./user.model";
import { RoleModel } from "./role.model";

interface UserRoles {
  id_user_role: number;
  ur_id_user: number;
  ur_id_role: number;
}

export class UserRolesModel extends Model<
  UserRoles,
  Omit<UserRoles, "id_user_role">
> {
  declare id_user_role: number;
  declare ur_id_user: number;
  declare ur_id_role: number;
}

UserRolesModel.init(
  {
    id_user_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    ur_id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id_user",
      },
    },
    ur_id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RoleModel,
        key: "id_role",
      },
    },
  },
  {
    sequelize: mariadb,
    modelName: "UserRolesModel",
    tableName: "mp_user_roles",
    timestamps: false,
  }
);

UserModel.belongsToMany(RoleModel, {
  through: UserRolesModel,
  as: "RoleModel",
  foreignKey: "ur_id_user",
});

RoleModel.belongsToMany(UserModel, {
  through: UserRolesModel,
  as: "UserModel",
  foreignKey: "ur_id_role",
});

// UserRolesModel.bulkCreate([
//   { ur_id_user: 1, ur_id_role: 1 },
//   { ur_id_user: 1, ur_id_role: 2 },
// ]);

// UserRolesModel.sync({ alter: true });
