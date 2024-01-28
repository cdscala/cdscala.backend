import passport from "passport"
import local from "passport-local"
import GitHubStrategy from "passport-github2"
import jwt from 'passport-jwt'
import { createHash, isValidPassword } from "../utils.js"
import UserModel from "../dao/models/user.model.js"
import config from "./server.config.js"

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

const initializePassport = (app) => {
    passport.use(
        "github",
        new GitHubStrategy(
          {
            clientID: config.gitClientID,
            clientSecret: config.gitClientSecret,
            callbackURL: config.gitCallbackURL,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              let user = await UserModel.findOne({ email: profile._json.email });
              if (!user) {
                let splitname = profile._json.name.split(' ')
                let newUser = {
                  first_name: splitname[0] || "NoName",
                  last_name: splitname[1] || "NoLastName",
                  age:0,
                  email: profile._json.email,
                  role: 'ADMIN',
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
        const { first_name, last_name, email, role } = req.body

        try {
          let user = await UserModel.findOne({ email: username })
          if (user) {
            console.log("Usuario ya existe")
            return done(null, false)
          }
          const newUser = {
            first_name,
            last_name,
            email,
            role,
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
          return done(error,false);
        }
      }
    )
  );
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        secretOrKey: config.privateKey,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "jwtCookie",
    new JWTStrategy(
      {
        secretOrKey: config.privateKey,
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
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
  
  app.use(passport.initialize())
  app.use(passport.session())


};



export default initializePassport;