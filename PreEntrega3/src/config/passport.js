import passport from "passport"
import local from "passport-local"
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js"
import UserModel from "../models/user.model.js"

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy(
          {
            clientID: process.env.GIT_CLIENT_ID,
            clientSecret: process.env.GIT_CLIENT_SECRET,
            callbackURL: process.env.GIT_CALLBACK_URL,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
            //   console.log(profile);
              let user = await UserModel.findOne({ email: profile._json.email });
              if (!user) {
                let splitname = profile._json.name.split(' ')
                let newUser = {
                  first_name: splitname[0] || "NoName",
                  last_name: splitname[1] || "NoLastName",
                  age:0,
                  email: profile._json.email,
                  password: "",
                };
                let result = await UserModel.create(newUser);
                done(null, result);
              } else {
                done(null, user);
              }
            } catch (error) {
              done(error);
            }
          }
        )
      );

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body

        try {
          let user = await userModel.findOne({ email: username })
          if (user) {
            console.log("Usuario ya existe")
            return done(null, false)
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };
          let result = await UserModel.create(newUser)
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario" + error)
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let user = await UserModel.findOne({ email: username });
          if (!user) {
            console.log("Usuario no existe ");
            return done(null, false);
          }

          if (!isValidPassword(user, password)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
};



export default initializePassport;