const express = require('express');
const router = express.Router();

const recipes = [];

router.get('/:food', function(req, res) {

    const recipe = {
      name: req.params.food,
      instructions: ["foo"],
      ingredients: ["foo"]
      
    }
  
    res.json(recipe);
});


router.post('/', (req, res) => {
  recipes.push(req.body);
  
  res.send(req.body);
});

module.exports = router;

