const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

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
    res.redirect('/login')
  }
})

  
module.exports = router;