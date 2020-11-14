const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Cart extends Model {}

Cart.init(
  // define table columns and configuration
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      },
    quantity: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cart',
  }

);

module.exports = Cart;