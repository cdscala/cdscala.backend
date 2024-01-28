import productRouter from './api/products.router.js'
import cartRouter from './api/cart.router.js'
import categoryRouter from './api/category.router.js'
import sessionRouter from './api/session.router.js'
import loginRouter from './views/login.router.js'
import profileRouter from './views/profile.router.js'
import recoveryRouter from './views/recovery.router.js'
import viewRouter from "./views/views.router.js"
import { passportCall } from '../utils.js'

const router = (app) => {
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/sessions', sessionRouter)

    app.use('/', viewRouter)
    app.use("/login", loginRouter);
    app.use("/profile",passportCall("jwtCookie"), profileRouter)
    app.use('/logout',passportCall("jwtCookie"), sessionRouter)
    app.use('/recovery', recoveryRouter)
    app.get("/current", passportCall("jwtCookie"), (req, res) => {
        res.send(req.user);
    });
}

export default router