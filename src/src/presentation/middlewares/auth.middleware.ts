import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "config";
import { RoleModel, UserModel } from "data";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.header("Authorization");
      if (!authorization)
        return res
          .status(401)
          .json({ ok: false, data: null, error: "No token provided" });
      if (!authorization.startsWith("Bearer "))
        return res
          .status(401)
          .json({ ok: false, data: null, error: "Invalid Bearer token" });
      const token = authorization.split(" ").at(1) || "";
      const payload = await JWTAdapter.validateToken<{ id: number }>(token);
      if (!payload)
        return res
          .status(401)
          .json({ ok: false, data: null, error: "Invalid token" });
      const user = await UserModel.findOne({
        where: { id_user: payload.id },
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
      if (!user)
        return res.status(401).json({
          ok: false,
          data: null,
          error: "Invalid token - user not found",
        });
      const { id_user, user_email, user_names, user_surnames, user_state } =
        user.dataValues;
      const roles = user.RoleModel.map(
        ({ id_role, role_name, role_state }) => ({
          id_role,
          role_name,
          role_state,
        })
      );
      req.body.userToken = {
        id_user,
        user_email,
        user_names,
        user_surnames,
        user_state,
        roles,
      };
      next();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ ok: false, data: null, error: "Internal server error" });
    }
  };
}
