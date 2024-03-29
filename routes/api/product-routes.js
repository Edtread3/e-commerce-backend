const router = require('express').Router();
const { models } = require('../../config/connection');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/',  async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {model: Category},
        {model: Tag, through: ProductTag},
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req,params.id, {
      include: [
        {model: Category},
        {model: Tag, through: ProductTag},
      ],
    });
    if (!product) {
      res.status(404).json({message: " Sorry Product not found"});
      return;
    }
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json(error);
  }
  
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr)
          .then(() => {
            res.status(201).json(product);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      } else {
      // if no product tags, just respond
      res.status(200).json(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  try {
  // update product data
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
    
      // find all associated tags from ProductTag
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
    
    
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      await Promise.all([
        models.ProductTag.destroy({ where: { id: productTagsToRemove } }),
        models.ProductTag.bulkCreate(newProductTags),
      ]);
    
       res.status(200).json({message: "Product updated successfully"});
    } catch (error) {
      res.status(500)
    }
});

router.delete('/:id', async (req, res) => {
  try{
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      res.status(404).json({message: "Sorry Product not found"});
      return;
    }
    res.status(200).json({ message: "Product deleted successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
