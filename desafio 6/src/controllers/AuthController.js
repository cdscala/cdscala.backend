import UserModel from "../models/user.model.js"

export const registerUser = async (req,res)=> {
    try {
        const {first_name, last_name, age, email, password} = req.body
        const user = new UserModel({first_name, last_name, age, email, password})
        await user.save()
        res.redirect('/profile')
    } catch (error) {
        console.log('Error al registrar usuario',error)
        res.redirect('/')
    }
}

export const loginUser = async (req,res) =>{
    try {
        const {first_name, last_name, age, email, password} = req.body
        const user = await UserModel.findOne({email,password})
        if (user){
            req.session.user = user
            res.redirect('/profile')
        }
        else{
            console.log('Combinacion de usuario y contraseña incorrecta')
            res.redirect('/') 
        }
    } catch (error) {
        console.log('Error al hacer login',error)
        res.redirect('/')
    }
}

export const logOut = async (req,res)=>{
    try {
        if(req.session.user){
            delete req.session.user
            req.session.destroy(error=>{
                if (error){
                    console.error('Error al cerrar la sesion', error)
                    res.status(500).send('Error al cerrar la sesion')
                }
                else{
                    res.redirect('/')
                }
            })
         }
    } catch (error) {
        console.log('Error al cerrar la sesion', error)
        res.status(500).send('Error al cerrar la sesion')
    }
} 