"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      club.belongsTo(models.user, {
        through: "userClubs",
        foreignKey: "clubId",
      });
    }
  }
  club.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      pictureUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "club",
    }
  );
  return club;
};
