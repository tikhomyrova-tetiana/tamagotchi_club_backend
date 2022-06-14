"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tamagotchis",
      [
        {
          name: "Tanya's kid",
          age: 1,
          deaths: 0,
          version: "The Original",
          generation: 2,
          imageUrl:
            "https://www.bandai.com/wp-content/uploads/tamagotchi-pix-logo-500x500.jpg",
          userId: 2,
          evolutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Naomi's kid",
          age: 1,
          deaths: 0,
          version: "The Original",
          generation: 2,
          imageUrl:
            "https://www.bandai.com/wp-content/uploads/tamagotchi-pix-logo-500x500.jpg",
          userId: 4,
          evolutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rayssa's kid",
          age: 1,
          deaths: 0,
          version: "The Original",
          generation: 2,
          imageUrl:
            "https://www.bandai.com/wp-content/uploads/tamagotchi-pix-logo-500x500.jpg",
          userId: 1,
          evolutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ana's kid",
          age: 1,
          deaths: 0,
          version: "The Original",
          generation: 2,
          imageUrl:
            "https://www.bandai.com/wp-content/uploads/tamagotchi-pix-logo-500x500.jpg",
          userId: 3,
          evolutionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tamagotchis", null, {});
  },
};
