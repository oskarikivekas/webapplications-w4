const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');




// get one
router.get('/:food', getRecipe,  (req, res) => {
  res.json(res.recipe)
});


// add one
router.post('/', async (req, res) => {
  console.log("löyty");
    if(req.body.name == null){
      return res.status(403).json({msg:'Name cannot be empty!'})
    } 
  const recipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions
  })

  
  try {
      if(await Recipe.findOne({name: req.body.name}) == null){
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
      }
      else{
        return res.status(403).json({msg:'There is a recipe with that name already!'})
      }

  } catch (err) {
      res.status(400).json({messsage: err.message});
  }
});




/*
router.post('/', (req, res, next) => {
  //recipes.push(req.body);
  //console.log('post: <' + req.body + ">");
  //res.send(req.body);

  Recipe.findOne({name: req.body.name}, (err, name) => {
    console.log(req.body);
    if(err) return next(err);
    if(!name) {
      const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body);
      });


    } else {
      return res.status(403).send('There is a recipe with that name already!')
    }
  })

  console.log(Recipe.findOne({name: "pizza"}));
});*/


//middleware function to query single recipe 
async function getRecipe(req, res, next) {
  let recipe;
  
  try{
    
      recipe = await Recipe.findOne({name: req.params.food}).exec();
      console.log(recipe);
      if (recipe == null) {
          return res.status(404).json({message: 'Cannot find recipe'});
      }
  } catch (err) {
      return res.status(500).json({message: err.message});
  }
  res.recipe = recipe;
  next();
}
module.exports = router;

