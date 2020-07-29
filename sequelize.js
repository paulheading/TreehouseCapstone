
// https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/

const Sequelize = require("sequelize"),
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "fsjstd-restapi.db",
      });

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

// const UserModel = require("./models/user");
// const CourseModel = require("./models/course");
// const User = UserModel(sequelize, Sequelize);
// const Course = CourseModel(sequelize, Sequelize);

// User.hasMany(Course, {
//   foreignKey: {
//     fieldname: "courseUserId",
//   },
// });

// Course.belongsTo(User, {
//   foreignKey: {
//     fieldname: "courseUserId",
//   },
// });

// module.exports = {
//   sequelize,
//   User,
//   Course,
// };
