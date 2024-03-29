const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
   try {
   const categories = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categories);
   } catch (error) {
    res.status(500).json(error);
   }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id,{
       include: [{model: Product}],
     });
     if (!category) {
     res.status(404).json({message: "Sorry Category not found"});
     return;
    } 
     res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);

    }
   
});

router.post('/', async (req, res) => {
  try{
    const category = await Category.create(req.body)
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
  
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {id: req.params.id},
    });
    if (!category[0]) {
      res.status(404).json({message: "Sorry Category not found"});
      return;
    }
    res.status(200).json({message: "Category Successfully updated"});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const category = await Category.delete({
      where: { id: req.params.id},
    });
    if (!category) {
      res.status(404).json({message:"Sorry Category not found"});
      return;
    }
    res.status(200).json({message: "Deleted category successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
