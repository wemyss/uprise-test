module.exports = function(sequelize, DataTypes) {
  const Coach = sequelize.define('Coach', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
  return Coach;
};
