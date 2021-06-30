const Sequelize = require("sequelize");
const User = require("./User");
const Clothes = require("./Clothes");
const Closet = require("./Closet");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Clothes = Clothes;
db.Closet = Closet;

User.init(sequelize);
Clothes.init(sequelize);
Closet.init(sequelize);

User.associate(db);
Clothes.associate(db);
Closet.associate(db);

module.exports = db;
