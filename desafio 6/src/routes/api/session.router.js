import express from 'express'
import { logOut, loginUser, registerUser } from '../../controllers/AuthController.js'
import { showProfile } from '../../controllers/UserController.js'


const sessionRouter = express.Router()

sessionRouter.post('/register', registerUser)

sessionRouter.post('/login', loginUser)

sessionRouter.get('/', logOut)

sessionRouter.post('/profile', showProfile)

export default sessionRouter