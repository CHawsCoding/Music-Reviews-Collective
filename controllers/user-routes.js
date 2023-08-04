const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      return res.json({ user: user, message: "You are now logged in!" });
    });
  })(req, res, next);
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
