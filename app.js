const express = require('express');
const recipeRouter = require('./api/recipe');
const app = express();
const path = require("path");
require('dotenv').config()


const mongoose = require('mongoose');

const db_address = process.env.DATABASE_URL;
console.log("db adress=" + db_address);
mongoose.connect(db_address, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'));


app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/recipe', recipeRouter);

app.get('/', (req, res) => {
    res.send("helloworld!");
});


const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
