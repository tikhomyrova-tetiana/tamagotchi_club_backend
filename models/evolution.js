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
      evolution.hasMany(models.tamagotchi, {
        foreignKey: "evolutionId",
      });
    }
  }
  evolution.init(
    {
      version: {
        type: DataTypes.STRING,
        defaultValue: "The Original",
      },
      generation: DataTypes.INTEGER,
      level: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "evolution",
    }
  );
  return evolution;
};
