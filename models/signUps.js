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

      // this.hasMany(models.Posts, {
      //   soueceKey: "userId",
      //   foreignKey: "UserId",
      // });
    }
  }
  signUps.init(
    {
      nickName: DataTypes.STRING,
      passWord: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'signUps',
    }
  );
  return signUps;
};
