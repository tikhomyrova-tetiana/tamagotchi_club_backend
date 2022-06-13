"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "evolutions",
      [
        {
          version: "The Original",
          generation: 1,
          level: "baby",
          description:
            "Needs constant care and attention. Never dies at this stage.",
          imageUrl: "baby.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "child",
          description: "",
          imageUrl: "child.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "teen",
          description: "Bad health",
          imageUrl: "bad_health_teen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "teen",
          description: "Good health",
          imageUrl: "good_health_teen.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Selfish & needs lots of care",
          imageUrl: "adult_1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Lil health & dies young",
          imageUrl: "adult_2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Main character",
          imageUrl: "adult_3.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Gets up late, goes to bed late & is selfish",
          imageUrl: "adult_4.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Average",
          imageUrl: "adult_5.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "adult",
          description: "Good health, long life & no complaints",
          imageUrl: "adult_6.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          version: "The Original",
          generation: 1,
          level: "senior",
          description: "Secret",
          imageUrl: "senior.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("evolutions", null, {});
  },
};
