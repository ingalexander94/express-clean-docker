import { JWTAdapter, envs } from "config";
import MailService from "config/nodemailer";
import { ForgotPasswordDTO } from "domains/dtos/auth/forgot-password.dto";
import { CustomError } from "domains/errors/custom.error";
import { AuthRepository } from "domains/repositories/auth.repository";

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

interface ForgotPasswordUseCase {
  execute(forgotPasswordDTO: ForgotPasswordDTO): Promise<boolean>;
}

export class ForgotPassword implements ForgotPasswordUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JWTAdapter.generateToken
  ) {}

  async execute(forgotPasswordDTO: ForgotPasswordDTO): Promise<boolean> {
    const id_user = await this.authRepository.forgotPassword(forgotPasswordDTO);
    const token = await this.signToken({ id: id_user }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");
    const emailService = MailService.getInstance();
    const isActive = await emailService.verifyConnection();
    if (!isActive) throw CustomError.internalServer("Error in email service");
    const recoveryLink = `${envs.URL_FRONTEND}/forgot?token=${token}`;
    await emailService.sendMail({
      from: `"MAPI"`,
      to: forgotPasswordDTO.user_email,
      subject: "Recuperar contraseña de Mapi",
      html: `
      <b>Por favor haga click en el enlace para recuperar su contraseña</b>
      <a href="${recoveryLink}">${recoveryLink}</a>
    `,
    });
    return true;
  }
}
