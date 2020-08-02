// **********************************************************************
// CREATE SERVER ********************************************************
// **********************************************************************

// https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let express = require("express");
let app = express();
let path = require("path");
let buildPath = path.join(__dirname, "client/build");

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

app.use(express.static(buildPath));

app.listen(process.env.PORT || 5000, function () {
  console.log("Node app is working!");
});

app.get("/params", (req, res) => {
  res.status(200).json(process.env);
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

const sequelize = new Sequelize(
  "mysql://tf4yp7nya0dny6gq:oj3rlwdr0w078369@e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/njm1oz2jrc6xnqkq"
);

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

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  Note.bulkCreate([
    { note: "pick up some bread after work", tag: "shopping" },
    { note: "remember to write up meeting notes", tag: "work" },
    { note: "learn how to use node orm", tag: "work" },
  ]).then(function () {
    return Note.findAll();
  });
});

// **********************************************************************
// CREATE ROUTES ********************************************************
// **********************************************************************

app.get("/notes", (req, res) => {
  Note.findAll().then((notes) => res.json(notes));
});

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
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
