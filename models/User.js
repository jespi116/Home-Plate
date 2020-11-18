const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      //console.log("\n\n");
        //console.log(this.password);
        //console.log(loginPw);
        //console.log(bcrypt.compareSync(loginPw, this.password))
        //console.log("\n\n");
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// define table columns and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,16]
      }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
    last_name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.NUMBER,
    },
    address: {
      type: DataTypes.STRING
    },
    city_state_zip: {
      type: DataTypes.STRING
    }
  },
  {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

  module.exports = User;