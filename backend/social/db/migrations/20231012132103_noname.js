const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "tenant_profiles", deps: []
 * createTable() => "user_profiles", deps: [TenantProfile]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2023-10-12T13:21:03.579Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "tenant_profiles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        tenantName: {
          type: Sequelize.STRING,
          field: "tenant_name",
          allowNull: false,
        },
        address: { type: Sequelize.STRING, field: "address", allowNull: false },
        city: { type: Sequelize.STRING, field: "city", allowNull: false },
        state: { type: Sequelize.STRING, field: "state", allowNull: false },
        country: { type: Sequelize.STRING, field: "country", allowNull: false },
        zipCode: { type: Sequelize.STRING, field: "zip_code", allowNull: true },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: false },
        webUrl: { type: Sequelize.STRING, field: "web_url", allowNull: true },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "user_profiles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "first_name",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "last_name",
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING,
          field: "department",
          allowNull: false,
        },
        designation: {
          type: Sequelize.STRING,
          field: "designation",
          allowNull: false,
        },
        tenantId: {
          type: Sequelize.INTEGER,
          field: "tenant_id",
          references: { model: "tenant_profiles", key: "id" },
          allowNull: false,
        },
        imageUrl: {
          type: Sequelize.STRING,
          field: "image_url",
          allowNull: true,
        },
        city: { type: Sequelize.STRING, field: "city", allowNull: false },
        country: { type: Sequelize.STRING, field: "country", allowNull: true },
        bio: { type: Sequelize.STRING, field: "bio", allowNull: true },
        socialLinks: {
          type: Sequelize.JSON,
          field: "social_links",
          allowNull: true,
        },
        employeeId: {
          type: Sequelize.INTEGER,
          field: "employee_id",
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["tenant_profiles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["user_profiles", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
