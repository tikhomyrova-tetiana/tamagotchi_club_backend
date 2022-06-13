"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.club, {
        through: "userClubs",
        foreignKey: "userId",
      });
      user.hasMany(models.tamagotchi, { foreignKey: "userId" });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://tamagotchi.com/wp-content/uploads/mametchi.jpg",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
