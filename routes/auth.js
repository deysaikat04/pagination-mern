const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const auth = require('../middleware/auth');

router.post(
  "/register",
  body("email").isEmail().trim().escape(),
  body("pin").isLength({ max: 4 }).trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, pin } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(404).json({
          message: "This email is already in use! Please use another email.",
        });
      } else {
        user = new User({
          email,
        });
        const salt = await bcrypt.genSalt(10);

        user.pin = await bcrypt.hash(pin, salt);

        let saved = await user.save();

        const payload = {
          user: {
            id: saved.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWTSECRET,
          { expiresIn: "1 days" },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
            });
          }
        );
      }
    } catch (err) {
      return res.json({ message: "Error occured! Please try again." });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail().trim().escape(),
  body("pin").isLength({ max: 4 }).trim().escape(),
  async (req, res) => {
    const { email, pin } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(pin, user.pin);

        if (!isMatch) {
          return res.status(400).json({ message: "Invalid Credential" });
        } else {
          const payload = {
            user: {
              id: user.id,
            },
          };
          jwt.sign(
            payload,
            process.env.JWTSECRET,
            { expiresIn: "7 days" },
            (err, token) => {
              if (err) throw err;
              res.json({
                token
              });
            }
          );
        }
      } else {
        return res
          .status(400)
          .json({
            message: "Yor are not registerd! Please signup to continue.",
          });
      }
    } catch (err) {
      res.status(404).json({ message: "Invalid token" });
    }
  }
);

router.get("/getUser", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (user) {
      res.status(200).json({
          email: user.email
      });
    } else {
      res.status(400).json({ message: "User doesn't exist" });
    }
  } catch (err) {
    res.status(404).json({ message: "Invalid token" });
  }
});

module.exports = router;
