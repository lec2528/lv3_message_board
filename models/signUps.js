"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class signUps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasOne(models.UserInfos, {
        soueceKey: "userId",
        foreignKey: "UserId",
      });

      this.hasMany(models.Posts, {
        soueceKey: "userId",
        foreignKey: "UserId",
      });

    }
  }
  signUps.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "signUps",
    }
  );
  return signUps;
};
