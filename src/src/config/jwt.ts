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

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);
        return resolve(decoded as T);
      });
    });
  }
}
