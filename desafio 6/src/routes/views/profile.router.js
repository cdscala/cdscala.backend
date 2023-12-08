import express from "express";

const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  let data = {
    layout: "index",
    user: req.session,
  };
  res.render("profile", data);
});

export default profileRouter;