import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  ForgotPassword,
  ForgotPasswordDTO,
  LoginUser,
  LoginUserDTO,
  NewPassword,
  NewPasswordDTO,
  RenewToken,
} from "domains";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ ok: false, data: null, error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, data: null, error: "Internal Server Error" });
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDTO.create(req.body);
    if (error) return res.status(400).json({ ok: false, data: null, error });

    new LoginUser(this.authRepository)
      .execute(loginUserDTO!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  renewToken = (req: Request, res: Response) => {
    new RenewToken(req.body.userToken)
      .execute()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  forgotPassword = (req: Request, res: Response) => {
    const [error, forgotPasswordDTO] = ForgotPasswordDTO.create(req.body);
    if (error) return res.status(400).json({ ok: false, data: null, error });
    new ForgotPassword(this.authRepository)
      .execute(forgotPasswordDTO!)
      .then((ok) => res.json({ ok, error: null }))
      .catch((error) => this.handleError(error, res));
  };

  newPassword = (req: Request, res: Response) => {
    const { userToken, user_password } = req.body;
    const [error, newPasswordDTO] = NewPasswordDTO.create({
      id_user: userToken.id_user,
      user_password,
    });
    if (error) return res.status(400).json({ ok: false, data: null, error });
    new NewPassword(this.authRepository)
      .execute(newPasswordDTO!)
      .then((ok) => res.json({ ok, error: null }))
      .catch((error) => this.handleError(error, res));
  };
}
