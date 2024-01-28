import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from "./server.config.js"

const initializeSession = (app) =>{
    app.use(session({
        secret: config.sessionHash,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.db,
            ttl: 2*60,
        })
    }))
}
export default initializeSession
