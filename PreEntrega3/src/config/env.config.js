import dotenv from "dotenv"

dotenv.config()

export default {
    db: process.env.MONGO,
    gitClientID: process.env.GIT_CLIENT_ID,
    gitClientSecret: process.env.GIT_CLIENT_SECRET,
    gitCallbackURL: process.env.GIT_CALLBACK_URL,
}