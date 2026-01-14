const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const RecipeModel = require("./models/Recipe.model")
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    RecipeModel.create(req.body)
    .then((data) => {
        console.log("recipe added", data);
        res.status(201).json(data);
    })
    .catch((err) => { 
        console.error("Error creating recipe:", err); 
        res.status(500).json({ error: "Internal Server Error" }); 
    });
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      console.error("Error fetching recipes:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  RecipeModel.findById(id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.error("Error fetching recipe by ID:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;

  RecipeModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      console.error("Error updating recipe:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  RecipeModel.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("Error deleting recipe:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
