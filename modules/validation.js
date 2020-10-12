const { check, validationResult } = require("express-validator");
const legit = require("legit");
const { asyncHandler } = require("./express");
const { User } = require("./sequelize");

const checkFirstName = check("firstName")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'First name'");

const checkLastName = check("lastName")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'Last name'");

const checkEmailAddress = check("emailAddress")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'Email address'");

const checkPassword = check("password")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'Password'");

const isEmailValid = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    // if theres blank fields => send error messages
    res.status(400).json({ errors: errorMessages });
  } else {
    try {
      // string must include @, otherwise legit wont respond
      const response = await legit(req.body.emailAddress);
      if (response.isValid) {
        // if the response is valid => go ahead
        next();
      } else {
        // if the response isnt valid => send error message
        res.status(400).json({ errors: ["Email address doesn't check out"] });
      }
    } catch {
      // if the response isnt valid => send error message
      res.status(400).json({ errors: ["Email address doesn't check out"] });
    }
  }
});

const isEmailTaken = asyncHandler(async (req, res, next) => {
  try {
    const test = await User.findAll({
      where: { emailAddress: req.body.emailAddress },
    });
    if (test.length > 0) {
      res.status(400).json({ errors: ["Email address is taken"] });
    } else {
      next();
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ errors: error.errors });
    } else {
      throw error;
    }
  }
});

module.exports = {
  checkFirstName,
  checkLastName,
  checkEmailAddress,
  checkPassword,
  isEmailValid,
  isEmailTaken,
};
