"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class evolution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      evolution.belongsToMany(models.tamagotchi, {
        foreignKey: "tamagotchiId",
      });
    }
  }
  evolution.init(
    {
      version: DataTypes.STRING,
      generation: DataTypes.INTEGER,
      level: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      tamagotchiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "evolution",
    }
  );
  return evolution;
};
