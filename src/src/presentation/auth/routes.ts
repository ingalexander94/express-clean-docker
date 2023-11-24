// Routes -> api/v1/auth

import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "infrastructure";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get Routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();

    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);

    return router;
  }
}
