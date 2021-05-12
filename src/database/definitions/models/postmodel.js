/* eslint-disable linebreak-style */
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'post',
    });
  return Post;
};
