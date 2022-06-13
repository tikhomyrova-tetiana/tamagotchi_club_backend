"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Rayssa",
          email: "rayssa@tama.com",
          password: bcrypt.hashSync("rayssa", SALT_ROUNDS),
          photoUrl: "https://tamagotchi.com/wp-content/uploads/mametchi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tanya",
          email: "tanya@tama.com",
          password: bcrypt.hashSync("tanya", SALT_ROUNDS),
          photoUrl: "https://tamagotchi.com/wp-content/uploads/mametchi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ana",
          email: "ana@tama.com",
          password: bcrypt.hashSync("ana", SALT_ROUNDS),
          photoUrl: "https://tamagotchi.com/wp-content/uploads/mametchi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Naomi",
          email: "naomi@tama.com",
          password: bcrypt.hashSync("naomi", SALT_ROUNDS),
          photoUrl: "https://tamagotchi.com/wp-content/uploads/mametchi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
