// **********************************************************************
// CREATE DATABASE ******************************************************
// **********************************************************************

// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/
// https://stackoverflow.com/questions/41332643/sending-data-to-database-in-react-js-web-application#answer-41332811
// https://dev.to/kmaryam27/step-by-step-react-nodejs-and-mysql-simple-full-stack-application-2018-part-4-2bhg
// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

const Sequelize = require("sequelize");

let node_env = process.env.NODE_ENV;
let sequelize;

if (node_env === "production") {
  // live database setup
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // local database setup
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
  });
  // local database reset
  sequelize.sync({ force: true }).then(() => {
    User.create({
      firstName: "Paul",
      lastName: "Heading",
      emailAddress: "paulheading@me.com",
      password: "$2a$10$BYqOQKj98RXZwLzrs6LaMOBa6/sHoKaLfYGbRhleaD1Lb/qrxN7v2",
      level: "free",
    });
    Blacklist.create({
      searchTerm: "grease",
      albumId: "5n47Dui0H3pGpZSOxITmoq",
      userId: "1",
    });
    Blacklist.create({
      searchTerm: "grease",
      albumId: "5WVPtycFFSm3uGhufMKwGn",
      userId: "1",
    });
    Saved.create({
      id: "1",
      searchTerm: "grease",
      userId: "1",
    });
  });
}

sequelize.authenticate().catch((err) => {
  console.error("Unable to connect to the database:", err);
});

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  emailAddress: Sequelize.TEXT,
  password: Sequelize.TEXT,
  level: Sequelize.TEXT,
});

const Saved = sequelize.define("saved", {
  searchTerm: Sequelize.TEXT,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

const Blacklist = sequelize.define("blacklist", {
  searchTerm: Sequelize.TEXT,
  albumId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Blacklist, {
  foreignKey: {
    fieldname: "id",
  },
});

User.hasMany(Saved, {
  foreignKey: {
    fieldname: "id",
  },
});

Blacklist.belongsTo(User, {
  foreignKey: {
    fieldname: "userId",
  },
});

Saved.belongsTo(User, {
  foreignKey: {
    fieldname: "userId",
  },
});

module.exports = {
  User,
  Saved,
  Blacklist,
};
