import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/v1/auth", AuthRoutes.Routes);
    return router;
  }
}
