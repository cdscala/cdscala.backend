import {fileURLToPath} from 'url'
import jwt from 'jsonwebtoken'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import config from './config/server.config.js'
import passport from 'passport'

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password)

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.privateKey, {expiresIn: '1d'})
    return token
}
export const verifyToken = (token) => {
    return jwt.verify(token.replace('Bearer ',''), config.privateKey)
} 
export const authorization = (role) => {
    return async (req, res, next) => {
        const user =req.headers?.authorization? verifyToken(req.headers.authorization):null
        if (!user) return res.status(401).send({ error: "Unauthorized" });
        if (toString(role) === 'PUBLIC'){
          next()
        }
        if (toString(user.role) === 'ADMIN'){
          next()
        }
        if (toString(user.role) !== toString(role))
          return res.status(403).send({ error: "No Permissions" });
        next();
      };
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
      passport.authenticate(strategy, function (err, user, info) {
        if (err) return next(err);
        if (!user) {
          return res
            .status(401)
            .send({ error: info.messages?.info, messages: info.toString() });
        }
        req.user = user;
        next();
      })(req, res, next);
    };
  };

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname