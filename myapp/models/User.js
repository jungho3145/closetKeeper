const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      //데이터 베이스 테이블 컬럼에 대한 설정
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        // 테이블 자체에 대한 설정
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    //옷을 여러개 등록 가능하니 owner로 외래키 등록 Clothes 테이블에 owner 컬럼 생성
    db.User.hasMany(db.Clothes, {
      foreignKey: "owner",
      sourceKey: "id",
      // as: "Cloth",
    });

    db.User.belongsTo(db.Closet, {
      foreignKey: "closet",
      targetKey: "id",
    });
  }
}

module.exports = User;
