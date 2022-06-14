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
      club.belongsToMany(models.user, {
        through: "userClubs",
        foreignKey: "clubId",
      });
      club.belongsTo(models.user, { foreignKey: "ownerId" });
    }
  }
  club.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      pictureUrl: DataTypes.STRING,
      backgroundcolor: DataTypes.STRING,
      textcolor: DataTypes.STRING,
      private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "club",
    }
  );
  return club;
};
