"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.signUps, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  UserInfos.init(
    {
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
      },
      nickName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      passWord: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserInfos",
    }
  );
  return UserInfos;
};
