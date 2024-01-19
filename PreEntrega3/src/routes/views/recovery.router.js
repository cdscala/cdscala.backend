import express from "express";

const recoveryRouter = express.Router();

recoveryRouter.get("/", (req, res) => {
  let data = {
    layout: "index",
    title: "Recuperar Contraseña",
    recovery: "/api/sessions/recovery"
  };
  res.render("recoverypassword", data);
});

export default recoveryRouter;