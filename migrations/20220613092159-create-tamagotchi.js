"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tamagotchis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      deaths: {
        type: Sequelize.INTEGER,
      },
      version: {
        type: Sequelize.STRING,
      },
      generation: {
        type: Sequelize.INTEGER,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
    await queryInterface.dropTable("tamagotchis");
  },
};
