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
}

// database reset
sequelize.sync({ force: true }).then(() => {
  User.create({
    firstName: "Demo",
    lastName: "User",
    emailAddress: "demo@me.com",
    password: "$2a$10$MW.UW1QLUMfVHp87elyEoeOuVncwcE/JDFMuVsQrirtP8xNXF.iLu",
    level: "free",
  });
  Blacklist.create({
    searchTerm: "grease",
    albumId: "786Anwp3pBYU4G3WFeQZTq",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "grease",
    albumId: "1x55RBNqokftmzDwDnWOSf",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "grease",
    albumId: "385XOLrrCH0kb5LLUBa6Zk",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "0tv8Nv5a3ogeRCuGQEH5xA",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "6i2A1N9iT26e0bRFTFECSP",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "4YTG1yOBPcufPRigRO9YCM",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "36t3hvr9NDOKn6y3NVBAlu",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "1hus3056xdxitC01IiuNBq",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "0IfAPdDU1feMP8za87rTef",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "7x5ZheRVIlLIoH5gNRe8Zj",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "7MHO4WRKzD9rlyuDnItuiE",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "1nkGgtSYKeE0kJyg4k8HES",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "2ZdQOIcOtPAsazAGyOvnOw",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "5bPuhn54IPZ5ZeDO4oWLtH",
    userId: "1",
  });
  Blacklist.create({
    searchTerm: "dumb and dumber",
    albumId: "2M2L4jkkv4jYxbKKObPnf2",
    userId: "1",
  });
  Saved.create({
    searchTerm: "grease",
    userId: "1",
  });
  Saved.create({
    searchTerm: "dumb and dumber",
    userId: "1",
  });
});

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
