type Environments = {
  PORT: number;
  JWT_SEED: string;
  URL_FRONTEND: string;
  HOST_DB: string;
  PORT_DB: number;
  USERNAME_DB: string;
  PASSWORD_DB: string;
  NAME_DB: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USERNAME: string;
  SMTP_PASSWORD: string;
  SMT_SENDER: string;
};

export const envs: Environments = {
  PORT: parseInt(process.env.PORT || "3000"),
  JWT_SEED: process.env.JWT_SEED || "B3n9aL1",
  URL_FRONTEND: process.env.URL_FRONTEND || "",
  HOST_DB: process.env.HOST_DB || "localhost",
  PORT_DB: parseInt(process.env.HOST_DB || "3306"),
  USERNAME_DB: process.env.USERNAME_DB || "",
  PASSWORD_DB: process.env.PASSWORD_DB || "",
  NAME_DB: process.env.NAME_DB || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465"),
  SMTP_USERNAME: process.env.SMTP_USERNAME || "",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
  SMT_SENDER: process.env.SMT_SENDER || "",
};
