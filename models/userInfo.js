module.exports = function(sequelize, DataTypes) {
  const UserInfo = sequelize.define("UserInfo", {
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    humanBio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  UserInfo.associate = db => {
    UserInfo.belongsTo(db.User);
  };
  return UserInfo;
};
