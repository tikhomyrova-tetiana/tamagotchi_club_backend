"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tamagotchi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tamagotchi.belongsTo(models.user, { foreignKey: "userId" });
      tamagotchi.hasOne(models.evolution, { foreignKey: "evolutionId" });
    }
  }
  tamagotchi.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deaths: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      version: {
        type: DataTypes.STRING,
        defaultValue: "The Original",
      },
      generation: DataTypes.INTEGER,
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.bandai.com/wp-content/uploads/tamagotchi-pix-logo-500x500.jpg",
      },
      userId: DataTypes.INTEGER,
      evolutionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tamagotchi",
    }
  );
  return tamagotchi;
};
