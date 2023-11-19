type Environments = {
  PORT: number;
  JWT_SEED: string;
  HOST_DB: string;
  PORT_DB: number;
  USERNAME_DB: string;
  PASSWORD_DB: string;
  NAME_DB: string;
};

export const envs: Environments = {
  PORT: parseInt(process.env.PORT || "3000"),
  JWT_SEED: process.env.JWT_SEED || "B3n9aL1",
  HOST_DB: process.env.HOST_DB || "localhost",
  PORT_DB: parseInt(process.env.HOST_DB || "3306"),
  USERNAME_DB: process.env.USERNAME_DB || "",
  PASSWORD_DB: process.env.PASSWORD_DB || "",
  NAME_DB: process.env.NAME_DB || "",
};
