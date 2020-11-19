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
});

Cart.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Cart, {
  foreignKey: 'user_id'
});
/* 
Cart.hasMany(Product, {
  foreignKey: 'product_id'
});

Product.belongsTo(Cart, {
  foreignKey: 'product_id'
}); */


// Products belongToMany User (through Cart)
Product.belongsToMany(User, {
  through: Cart,
  foreignKey: 'product_id', 
  otherKey: 'user_id'
});

 // Tags belongToMany Products (through ProductTag)
User.belongsToMany(Product, {       //Corrected the associations between User and products
  through: Cart,
  foreignKey: 'user_id'
});

module.exports = {
  Product,
  Category,
  Cart,
  User,
};
 