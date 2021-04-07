module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {

    userId: {
      type: DataTypes.BIGINT(20),
      primarykey: true,
      allowNull: false,
      autoIncreament: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tablbename: 'user',
    timestamps: false,
  });
  return User;
};
