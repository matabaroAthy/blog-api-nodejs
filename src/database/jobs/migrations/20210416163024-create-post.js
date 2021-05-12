module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('post'),
};
