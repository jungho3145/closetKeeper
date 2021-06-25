const Sequelize = require("sequelize");

class Clothes extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        kind: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        materials: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        size: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(100),
          allownull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Clothes",
        tableName: "clothes",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Clothes.belongsTo(db.User, {
      foreignKey: "owner",
      targetKey: "id",
      // as: "owners",
    });
  }
}

module.exports = Clothes;
