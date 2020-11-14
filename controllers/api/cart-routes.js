//uses "/api/mycart" route
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Category, Product, Cart } = require('../../models');

router.get('/', (req, res) => {
    Cart.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'user_id', 'product_id', 'quantity'],
        //include: 
        //    {
        //        model: Product,
        //        attributes: ['product_name', 'price', 'stock']
        //    }
    })
    .then(dbCartData => res.json(dbCartData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
});

router.get(`/:id`, (req, res) => {
    Cart.findOne({
        where: {
            user_id: req.session.user_id,
            id: req.params.id
        },
        attributes: ['id', 'user_id', 'product_id', 'quantity'],
        //include: 
        //    {
        //        model: Product,
        //        attributes: ['product_name', 'price', 'stock']
        //    }
    })
    .then(dbCartData => {
        if (!dbCartData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
        }
        res.json(dbCartData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
    Cart.create({
            user_id: req.session.user_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
    })
    .then(dbCartData => res.json(dbCartData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Cart.destroy({
        where: {
            user_id: req.session.user_id,
            id: req.params.id
        }
    })
    .then(dbCartData => {
        if (!dbCartData) {
          res.status(404).json({ message: 'No Category found with this id' });
          return;
        }
        res.json(dbCartData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;