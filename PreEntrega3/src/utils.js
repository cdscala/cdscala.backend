import {fileURLToPath} from 'url'
import jwt from 'jsonwebtoken'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import config from './config/env.config.js'

export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password)

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.privateKey, {expiresIn: '1d'})
    return token
}
export const verifyToken = (token) => {
    return jwt.verify(token.replace('Bearer','', config.privateKey))
} 


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname