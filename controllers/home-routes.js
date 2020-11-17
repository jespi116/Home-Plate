const router = require('express').Router();
//const sequelize = require('../config/connection');
//const { Product, User, Cart, Category } = require('../models');

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

  
module.exports = router;