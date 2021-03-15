const router = require("express").Router();
const { request } = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attribute: ['product_name','id','price','stock','category_id']
    }
  })
    .then((categoryData) => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attribute: ['category_id'],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "no category found with that ID." });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(cateData => {
    if (!categoryData){
      res.status(404).json({message:'no category found with that ID.'});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete a category by its `id` value
});

module.exports = router;
