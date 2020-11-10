module.exports = function(sequelize, DataTypes) {
  const Dog = sequelize.define("Dog", {
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    fixed: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    plainText: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  Dog.associate = db => {
    Dog.belongsTo(db.Dog);
  };
  return Dog;
};
