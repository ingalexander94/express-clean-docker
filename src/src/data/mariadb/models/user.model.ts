import { DataTypes, Model } from "sequelize";
import { mariadb } from "../mariadb-database";
import { RoleEntity } from "domains";

interface User {
  id_user: string;
  user_names: string;
  user_surnames: string;
  user_email: string;
  user_password: string;
  user_phone?: string;
  user_photo?: string;
  user_state: number;
}

export class UserModel extends Model<User, Omit<User, "id_user">> {
  declare id_user: number;
  declare user_names: string;
  declare user_surnames: string;
  declare user_email: string;
  declare user_password: string;
  declare user_phone?: string;
  declare user_photo?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare RoleModel: RoleEntity[];
}

UserModel.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_names: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    user_surnames: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    user_password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [64, 64],
      },
    },
    user_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
        len: [1, 20],
      },
    },
    user_photo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    user_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0: inactivo, 1: activo",
    },
  },
  {
    sequelize: mariadb,
    modelName: "UserModel",
    tableName: "mp_users",
    timestamps: true,
  }
);

// UserModel.create({
//   user_names: "Luis Alexander",
//   user_surnames: "Peñaloza Romero",
//   user_email: "luis.penaloza@wiedii.co",
//   user_password:
//     "ac0fa7b7cfcf733d2be600c3bcd1b79667cf86e73ee2041a1c93fa35e1700618", // Wiedii2023*
//   user_phone: "3213568479",
//   user_state: 1,
// });

// UserModel.sync({ alter: true });
