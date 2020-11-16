// uses "/api/products" endpoint

const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    attributes: [
      'id',
      'product_name',
      'description',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']   //changed the attribute, added id, I think we will use it in the future
      }
    ]
  })
  .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'product_name',
      'description',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['id','category_name']
      }
    ]
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {res.status(200).json(product);})
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No Product found with this id' });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
