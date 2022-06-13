"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("evolutions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      version: {
        type: Sequelize.STRING,
      },
      generation: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      tamagotchiId: {
        type: Sequelize.INTEGER,
        references: {
          model: "tamagotchis",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("evolutions");
  },
};
