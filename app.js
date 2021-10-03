const express = require('express');
const recipeRouter = require('./api/recipe');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/recipe', recipeRouter);
app.get('/', (req, res) => {
    res.send("helloworld!");
});


const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
