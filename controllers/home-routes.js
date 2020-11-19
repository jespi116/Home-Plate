const router = require('express').Router();
const sequelize = require('../config/connection');
const { Product, User, Cart, Category } = require('../models');

router.get('/', (req, res) => {

         
          res.render('welcome', {
              loggedIn: req.session.loggedIn,
              user_id: req.session.user_id,
              username: req.session.username
            });
        });

        //route for myCart
router.get('/myCart', (req, res) => {
        Cart.findAll({
          where: {
            user_id: req.session.user_id
          },
          attributes: [
            'id',
            'user_id',
            'product_id',
            'quantity'
          ]
        })
        .then(dbCartData => {
          if (!dbCartData) {
            res.status(404).json({ message: 'No Product found with this id' });
            return;
          }
          // serialize the data
          const carts = dbCartData.map(cart => cart.get({ plain: true }));
  
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

  
module.exports = router;