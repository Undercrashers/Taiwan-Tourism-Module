const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Submission = require("../models/Submission");

const clean = (s = "") => s.replace(/[<>]/g, "").trim();

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Please enter your name")
      .escape(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail(),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Tell us a bit more about your plans")
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, country, interests, message } = req.body;
      await Submission.create({
        name: clean(name),
        email,
        country: clean(country),
        interests: clean(interests),
        message: clean(message),
        submitted_at: new Date(),
      });
      res
        .status(201)
        .json({
          success: true,
          message: "Thanks! We've received your request",
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

module.exports = router;
