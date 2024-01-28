import { Command } from "commander";
import dotenv from "dotenv";

const commander = new Command();

commander.option(
  `--mode <mode>`,
  "Modo del servidor: development o production",
);
commander.option(
  `--persistence <persistence>`,
  "Modo de persistencia: mongo o memory",
);

commander.parse();

const mode = commander.opts().mode;
const persistence = commander.opts().persistence;

const envPath = `.env.${mode}`;
dotenv.config({ path: envPath });

export default {
  port: process.env.PORT,
  url: process.env.URL,
  mode: mode,
  persistence: persistence,
  db: process.env.MONGO,
  gitClientID: process.env.GIT_CLIENT_ID,
  gitClientSecret: process.env.GIT_CLIENT_SECRET,
  gitCallbackURL: process.env.GIT_CALLBACK_URL,
  sessionHash: process.env.HASH,
  privateKey: process.env.KEYSECRET,
};