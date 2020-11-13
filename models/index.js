// import models
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const User = require('./User');

// Products belongsTo Category      (ok)
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products        (ok)
Category.hasMany(Product, {
  foreignKey: 'category_id'
})

// Products belongToMany User (through Cart)
Product.belongsToMany(User, {
  through: Cart,
  foreignKey: 'product_id', 
  otherKey: 'user_id'
});

// Tags belongToMany Products (through ProductTag)
User.hasMany(Product, {
  through: Cart,
  foreignKey: 'user_id'
});

module.exports = {
  Product,
  Category,
  Cart,
  User,
};
