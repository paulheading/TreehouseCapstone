// **********************************************************************
// CREATE SERVER ********************************************************
// **********************************************************************

// https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/

// env variables
const dotenv = require("dotenv");
dotenv.config();

// express variables
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const buildPath = path.join(__dirname, "build");
const { asyncHandler } = require("./modules/express");

// authentication variables
const bcryptjs = require("bcryptjs");
const { authenticateUser } = require("./modules/authentication");

// validation variables
const {
  checkFirstName,
  checkLastName,
  checkEmailAddress,
  checkPassword,
  isEmailValid,
  isEmailTaken,
} = require("./modules/validation");

const { User, Saved, Blacklist } = require("./modules/sequelize");

app.use(express.static(buildPath)).use(cors()).use(cookieParser());

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log("Node app is working!");
});

// **********************************************************************
// CREATE ROUTES ********************************************************
// **********************************************************************

app.post("/blacklist", (req, res) => {
  Blacklist.create({
    userId: req.body.userId,
    searchTerm: req.body.searchTerm,
    albumId: req.body.albumId,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
    });
});

app.post("/saved", (req, res) => {
  Saved.create({
    userId: req.body.userId,
    searchTerm: req.body.searchTerm,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
    });
});

app.post(
  "/users",
  checkFirstName,
  checkLastName,
  checkEmailAddress,
  checkPassword,
  isEmailValid,
  isEmailTaken,
  asyncHandler(async (req, res) => {
    try {
      // create user variable
      const user = req.body;
      // hash the new users password
      user.password = bcryptjs.hashSync(user.password);
      // create database entry
      await User.create(user);
      // return okay status
      res.json(user).status(200);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ errors: error.errors });
      } else {
        throw error;
      }
    }
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await req.currentUser;
    res.status(200).send(user);
  })
);

// Place wildcard routes last *******************************************

app.get("/blacklist/:id", (req, res) => {
  Blacklist.findAll({ where: { userId: req.params.id } }).then((data) =>
    res.json(data)
  );
});

app.get("/saved/:id", (req, res) => {
  Saved.findAll({ where: { userId: req.params.id } }).then((data) =>
    res.json(data)
  );
});

// https://medium.com/@JonasJancarik/handling-those-unhandled-promise-rejections-when-using-javascript-async-await-and-ifee-5bac52a0b29f

app.delete("/blacklist/:album", async (req, res) => {
  const record = await Blacklist.findByPk(req.params.album);
  try {
    if (record) {
      // delete record
      await record.destroy();
      // return no content
      res.sendStatus(204);
    } else {
      // return not found
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/saved/:id", async (req, res) => {
  const record = await Saved.findByPk(req.params.id);
  try {
    if (record) {
      // delete record
      await record.destroy();
      // return no content
      res.sendStatus(204);
    } else {
      // return not found
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
});

// **********************************************************************
// MOCHA TESTING ********************************************************
// **********************************************************************

function sayHello() {
  return "hello";
}

module.exports = {
  sayHello,
};
