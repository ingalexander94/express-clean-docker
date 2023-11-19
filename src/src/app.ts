import { envs } from "config";
import { mariadb } from "data";
import { AppRoutes, Server } from "presentation";

(() => {
  main();
})();

async function main() {
  await mariadb.authenticate();

  console.log("DB is online !!!");

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
