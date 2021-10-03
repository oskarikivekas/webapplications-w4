const express = require('express');
const router = express.Router();

router.get('/:food', function(req, res) {

    const recipe = {
      name: req.params.food,
      instructions: ["foo"],
      ingredients: ["foo"]
      
    }
    res.json({recipe});
});


module.exports = router;

