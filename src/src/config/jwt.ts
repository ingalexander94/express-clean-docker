import jwt from "jsonwebtoken";
import { envs } from "./environments";

export class JWTAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          return resolve(token!);
        }
      );
    });
  }
}
