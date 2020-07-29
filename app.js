
// **********************************************************************
// CREATE SERVER ********************************************************
// **********************************************************************

let express = require("express");
let app = express();
let path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Node app is working!");
});

// **********************************************************************
// CREATE DATABASE ******************************************************
// **********************************************************************

// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/

const Sequelize = require("sequelize"),
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });

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
  ])
    .then(function () {
      return Note.findAll();
    })
    .then(function (notes) {
      console.log(notes);
    });
});

// **********************************************************************
// CREATE ROUTES ********************************************************
// **********************************************************************

app.get('/notes', (req, res) => {
  Note.findAll().then(notes => res.json(notes));
});

// Place wildcard routes last *******************************************

app.get('/notes/:id', (req, res) => {
  Note.findAll({ where: { id: req.params.id } }).then(notes => res.json(notes));
});