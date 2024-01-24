import express from 'express'
import passport from 'passport'
import { logOut, loginUser, recoveryPassword, registerUser } from '../../controllers/auth.controller.js'
import { showProfile } from '../../controllers/user.controller.js'
import { generateToken } from '../../utils.js'

const sessionRouter = express.Router()
sessionRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => {}
);
  
sessionRouter.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      req.session.user = req.user
      res.redirect("/profile")
    }
);

// sessionRouter.post('/register', registerUser)
sessionRouter.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/login" }),
    async (req, res) => {
      let user = req.user
      delete user.password
      req.session.user = user
      res.redirect("/profile")
    }
  );

// sessionRouter.post('/login', loginUser)
sessionRouter.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/login" }),
    async (req, res) => {
      let user = req.user
      if (!user)
        return res
          .status(400)
          .send({ status: "Error", error: "Invalid Credentials" })
      delete user.password
      req.session.user = user
      res.redirect("/profile")
    }
  )

sessionRouter.post(
    "/ext/login",
    function (req, res) {
      passport.authenticate('login', {session: false}, (err, user, info) => {
        console.log(err)
        console.log(user)
        console.log(info)
          if (err || !user) {
              return res
                .status(400)
                .send({ 
                  status: "Error", 
                  error: "Invalid Credentials" 
                });
          }
         req.login(user, {session: false}, (err) => {
             if (err) {
                 res.send(err);
             }
             const token = generateToken(user);
             return res.json({user, token});
          });
      })(req, res);
  });

sessionRouter.post('/recovery', recoveryPassword)

sessionRouter.get('/', logOut)

sessionRouter.post('/profile', showProfile)

export default sessionRouter