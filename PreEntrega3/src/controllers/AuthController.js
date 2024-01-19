import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils.js"

export const registerUser = async (req,res)=> {
    try {
        const {first_name, last_name, age, email, password} = req.body
        if (!first_name || !last_name || !email || !password){
            return res.status(401).send({status: 'Error', error: 'campos incompletos'})
        }
        const user = new UserModel({first_name, last_name, age, email, password: createHash(password)})
        await user.save()
        res.redirect('/login')
    } catch (error) {
        console.log('Error al registrar usuario',error)
        res.redirect('/')
    }
}

export const loginUser = async (req,res) =>{
    try {
        const {first_name, last_name, age, email, password} = req.body
        const user = await UserModel.findOne({email},{email:1,first_name:1,last_name:1,password:1})
        if (!user){
            return res
            .status(401)
            .send({status:'Error',error:'Combinacion de usuario y contraseña incorrecta'})
            
        }
        if (!isValidPassword(user,password)){
            return res
            .status(401)
            .send({status:'Error',error:'Combinacion de usuario y contraseña incorrecta'})
        }
        delete user.password
        req.session.user = user
        res.redirect('/profile')
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

export const recoveryPassword = async (req,res)=>{
    try {
        const {email, password} = req.body
        await UserModel.updateOne({ email }, { password: createHash(password) });
        res.redirect("/login");
      } catch (error) {
        console.error("Error al recuperar contraseña", error);
        res.status(500).send("Error al recuperar");
    }
} 