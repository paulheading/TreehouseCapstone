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

// spotify variables
const request = require("request");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

// https://www.freecodecamp.org/news/deploy-a-react-node-app-to/
// https://dev.to/loujaybee/using-create-react-app-with-express
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// Use React Build folder

app.use(express.static(buildPath)).use(cors()).use(cookieParser());

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log("Node app is working!");
});

// **********************************************************************
// GET SPOTIFY AUTH *****************************************************
// **********************************************************************

// https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow

let client_url, bounce;
let node_env = process.env.NODE_ENV;
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let localhost = "http://localhost";

if (node_env === "dev") {
  client_url = `${localhost}:${process.env.PORT}`;
  bounce = `${localhost}:3000/#`;
}

if (node_env === "staging") {
  client_url = `${localhost}:${process.env.PORT}`;
  bounce = `${client_url}/#`;
}

if (node_env === "production") {
  client_url = process.env.SITE_URL;
  bounce = `${client_url}/#`;
}

let redirect_uri = `${client_url}/callback`;

let generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // application requests authorization
  let scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
        state,
      })
  );
});

app.get("/callback", function (req, res) {
  // application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          bounce +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          bounce +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
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
