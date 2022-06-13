"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "clubs",
      [
        {
          name: "Our club",
          description: "Best club ever!",
          pictureUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahfTo9tMzej7PJ3lDWSRpY6qQK_aeyhdGz6clRpnxEe8W4o1oLjzSb5M5eGyw-1Si3gI&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("clubs", null, {});
  },
};
