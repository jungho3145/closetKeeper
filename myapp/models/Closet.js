const Sequelize = require("sequelize");

class Closet extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        Hum: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Closet",
        tableName: "closet",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Closet.hasOne(db.User, { foreignKey: "closet", sourceKey: "id" });
  }
}

module.exports = Closet;
