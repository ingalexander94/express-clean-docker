import { NewPasswordDTO } from "domains/dtos/auth/new-password.dto";
import { AuthRepository } from "domains/repositories/auth.repository";

interface NewPasswordUseCase {
  execute(newPasswordDTO: NewPasswordDTO): Promise<boolean>;
}

export class NewPassword implements NewPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(newPasswordDTO: NewPasswordDTO): Promise<boolean> {
    const updated = await this.authRepository.newPassword(newPasswordDTO);
    return updated;
  }
}
