const auth = require("basic-auth");
const bcryptjs = require("bcryptjs");
const { asyncHandler } = require("./express");
const { User } = require("./sequelize");

const authenticateUser = asyncHandler(async (req, res, next) => {
  let message = null;

  // get user credentials from header
  const credentials = auth(req);

  if (credentials) {
    // look for user in database by emailAddress
    // check for match with crudentials
    let user = await User.findAll({
      where: { emailAddress: credentials.name },
    });

    user = user[0];

    if (user) {
      // compare database + header passwords with bcrypt
      const authenticated = bcryptjs.compareSync(
        credentials.pass,
        user.password
      );

      if (authenticated) {
        // keep messaging vague
        console.log(`Authentication successful for user: ${user.username}`);
        // store the database user info on req so any other middleware can access the info
        req.currentUser = user;
      } else {
        // keep messaging vague
        message = `Authentication failure for user: ${user.username}`;
      }
    } else {
      // keep messaging vague
      message = `User not found for user: ${credentials.username}`;
    }
  } else {
    // keep messaging vague
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    // keep messaging vague
    res.status(400).json({ message: "Access Denied" });
  } else {
    next();
  }
});

module.exports = {
  authenticateUser,
};
