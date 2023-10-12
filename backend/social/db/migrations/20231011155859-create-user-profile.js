/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      department: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tenantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tenant_profiles",
          key: "id",
        },
      },
      imageUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      socialLinks: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      employeeId: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("user_profiles");
  },
};
