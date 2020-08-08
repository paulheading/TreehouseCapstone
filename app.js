
// **********************************************************************
// CREATE SERVER ********************************************************
// **********************************************************************

// https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/

// env variables
const dotenv = require("dotenv");
dotenv.config();

// express variables
let express = require("express");
let app = express();
let path = require("path");
let buildPath = path.join(__dirname, "public");
let port = 5000;

// spotify variables
let request = require("request");
let cors = require("cors");
let querystring = require("querystring");
let cookieParser = require("cookie-parser");

// .env context switching; if heroku needs different production settings

// if (process.env.NODE_ENV !== 'production') {
//   buildPath = path.join(__dirname, 'build');
// } else {
// }

// console.log(process.env);
// console.log(process.env.NODE_ENV);

// https://www.freecodecamp.org/news/deploy-a-react-node-app-to/
// https://dev.to/loujaybee/using-create-react-app-with-express
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// Use React Build folder

app
.use(express.static(buildPath))
.use(cors())
.use(cookieParser());

app.get("/params", (req, res) => {
  res.status(200).json(process.env);
});

app.listen(process.env.PORT || port, () => {
  console.log("Node app is working!");
});

// **********************************************************************
// GET SPOTIFY AUTH *****************************************************
// **********************************************************************

// https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow

let client_id = process.env.CLIENT_ID; // Your client id
let client_secret = process.env.CLIENT_SECRET; // Your secret
let redirect_uri = `http://localhost:${port}/callback`; // Your redirect uri

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
  let scope = "user-read-private user-read-email user-read-playback-state";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
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
          `http://localhost:${port}/#` +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
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
// CREATE DATABASE ******************************************************
// **********************************************************************

// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/

const Sequelize = require("sequelize");

// local database setup

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "database.sqlite",
// });

// live database setup

const sequelize = new Sequelize(process.env.JAWSDB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const Note = sequelize.define("notes", {
  note: Sequelize.TEXT,
  tag: Sequelize.STRING,
});

const Item = sequelize.define("items", {
  item: Sequelize.TEXT,
});

sequelize.sync({ force: true }).then(() => {
  Note.bulkCreate([
    { note: "pick up some bread after work", tag: "shopping" },
    { note: "remember to write up meeting notes", tag: "work" },
    { note: "learn how to use node orm", tag: "work" },
  ]).then(function () {
    return Note.findAll();
  });
  Item.bulkCreate([
    { item: "item1" },
    { item: "item2" },
    { item: "item3" },
  ]).then(function () {
    return Item.findAll();
  });
});

// **********************************************************************
// CREATE ROUTES ********************************************************
// **********************************************************************

app.get("/notes", (req, res) => {
  Note.findAll().then((notes) => res.json(notes));
});

app.get("/api/getList", (req, res) => {
  Item.findAll({
    attributes: ["item"],
  }).then((items) => res.json(items));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Place wildcard routes last *******************************************

app.get("/notes/:id", (req, res) => {
  Note.findAll({ where: { id: req.params.id } }).then((notes) =>
    res.json(notes)
  );
});
