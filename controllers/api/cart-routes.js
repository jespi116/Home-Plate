// uses "/api/mycart" endpoint

const router = require('express').Router();
const { Cart } = require('../../models');

router.post('/', (req, res) => {
    //add product to cart
    Cart.create({
        //must be logged in to find user id
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

router.put('/:id', (req, res) => {
    //update quantity of product in cart
    Cart.update(req.body, {
        where: {
            //must be logged in to find user id
            user_id: req.session.user_id,
            id: req.params.id
        }
    })
    .then(dbCartData => {
        if (!dbCartData) {
          res.status(404).json({ message: 'No Product found with this id' });
          return;
        }
        res.json(dbCartData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/:id', (req, res) => {
    //delete product from cart
    Cart.destroy({
        where: {
            //must be logged in to find user id
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