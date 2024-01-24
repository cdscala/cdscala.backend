import productRouter from './api/products.router.js'
import cartRouter from './api/cart.router.js'
import categoryRouter from './api/category.router.js'
import sessionRouter from './api/session.router.js'
import loginRouter from './views/login.router.js'
import profileRouter from './views/profile.router.js'
import recoveryRouter from './views/recovery.router.js'
import viewRouter from "./views/views.router.js"

const router = (app) => {
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/sessions', sessionRouter)

    app.use('/', viewRouter)
    app.use("/login", loginRouter);
    app.use("/profile", profileRouter)
    app.use('/logout', sessionRouter)
    app.use('/recovery', recoveryRouter)
}

export default router