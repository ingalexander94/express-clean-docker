import nodemailer from "nodemailer";
import { envs } from "./environments";

export type MailInterface = {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
};

export default class MailService {
  private static instance: MailService;
  private declare transporter: nodemailer.Transporter;

  private constructor() {}

  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: envs.SMTP_HOST,
      port: envs.SMTP_PORT,
      secure: true,
      auth: {
        user: envs.SMTP_USERNAME,
        pass: envs.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(options: MailInterface) {
    return await this.transporter.sendMail(options);
  }

  async verifyConnection(): Promise<boolean> {
    return this.transporter.verify();
  }
}
