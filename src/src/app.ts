import { envs } from "config";
import MailService from "config/nodemailer";
import { mariadb } from "data";
import { AppRoutes, Server } from "presentation";

(() => {
  main();
})();

async function main() {
  await mariadb.authenticate();

  console.log("DB is online !!!");

  const emailService = MailService.getInstance();
  await emailService.createConnection();

  console.log("Email service is online !!!");

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
