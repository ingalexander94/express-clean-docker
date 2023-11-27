import { DataTypes, Model } from "sequelize";
import { mariadb } from "../mariadb-database";

interface Role {
  id_role: number;
  role_name: string;
  role_description: string;
  role_state: number;
}

export class RoleModel extends Model<Role, Omit<Role, "id_role">> {
  declare id_name: number;
  declare role_name: string;
  declare role_description: string;
  declare role_state: number;
}

RoleModel.init(
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    role_description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    role_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0: inactivo, 1: activo",
    },
  },
  {
    sequelize: mariadb,
    modelName: "RoleModel",
    tableName: "mp_roles",
    timestamps: false,
  }
);

// RoleModel.bulkCreate([
//   {
//     role_name: "SUPERADMIN",
//     role_description:
//       "Tiene acceso a todos los recursos y funciones dentro de MAPI.",
//     role_state: 1,
//   },
//   {
//     role_name: "ADMINISTRADOR",
//     role_description:
//       "Tienen la capacidad de crear, modificar y eliminar cuentas de usuario dentro de MAPI.",
//     role_state: 1,
//   },
//   {
//     role_name: "LIDER DE MANTENIMIENTO",
//     role_description:
//       "Es responsable de la coordinación de actividades relacionadas con el mantenimiento de equipos.",
//     role_state: 1,
//   },
//   {
//     role_name: "TÉCNICO",
//     role_description:
//       "Realizan tareas prácticas y aplican sus conocimientos para llevar a cabo funciones específicas.",
//     role_state: 1,
//   },
// ]);

// RoleModel.sync({ alter: true });
