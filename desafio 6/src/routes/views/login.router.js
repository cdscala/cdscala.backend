import express from "express"

const loginRouter = express.Router()

loginRouter.get("/", (req, res) => {
  let data = {
    layout: "index",
    title: "Inicio de sesión",
    title_register: "Registro",
    actionRegister: "/api/sessions/register/",
    actionLogin: "/api/sessions/login/",
  }
  res.render("login", data)
});


export default loginRouter