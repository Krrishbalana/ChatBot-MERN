import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password should contain minimum 8 and maximum 15 characters"),
];

export const signUpValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password should contain minimum 8 and maximum 15 characters"),
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];
