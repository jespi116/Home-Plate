const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart, Category } = require('../models');

router.get('/', (req, res) => {
         
  res.render('welcome', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    });
});
  

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
  res.render('login', {key: 'Login', action: true, text:'login'});

});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
  res.render('signup', {key: 'SignUp', action: false, text:'signup'});

});

router.get('/myCart', (req, res) => {
  // find one category by its `id` value
  User.findAll({
    where: {
      id: req.session.user_id
    },
    include: [
      {
        model: Cart
      },
      {
        model: Product
      }
    ]
  })
  .then(dbCartData => {
    if (!dbCartData) {
      res.status(404).json({ message: 'No Product found with this id' });
      return;
    }
    // serialize the data
  const carts = dbCartData.map(cart => cart.get({ plain: true }));

  console.log( JSON.stringify(carts.products));
  
  // pass data to template
  res.render('myCart', {
      carts,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      username: req.session.username
    });
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/account/:id', (req, res) => {
  if (req.session.loggedIn) {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'username',
        'email',
        'password',
        'phone',
        'last_name',
        'first_name',
        'address',
        'city_state_zip'
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        
        const user = dbUserData.get({ plain: true });
        
        res.render('account', { 
          user,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
    return;
  } else {
    res.redirect('/')
  }
})

router.get('/categories/all', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'description', 'price', 'stock'],
    include: {
      model: Category,
      attributes: ['id', 'category_name']
    }
  })
  .then(dbProductData => {
    const products = dbProductData.map(product => product.get({ plain: true }));
    res.render('categories', {
      products,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/categories/all/:id', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'description', 'price', 'stock'],
    include: {
      model: Category,
      attributes: ['id', 'category_name']
    }
  })
  .then(dbProductData => {
    const products = dbProductData.map(product => product.get({ plain: true }));
    res.render('categories', {
      products,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/categories/:category', (req, res) => {
  Category.findOne({
    where: {
      category_name: req.params.category
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'description', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    
    const category = dbCategoryData.get({ plain: true });
    
    res.render('categories', { 
      category,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/categories/:category/:id', (req, res) => {
  Category.findOne({
    where: {
      category_name: req.params.category
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'description', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    
    const category = dbCategoryData.get({ plain: true });
    
    res.render('categories', { 
      category,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  
module.exports = router;