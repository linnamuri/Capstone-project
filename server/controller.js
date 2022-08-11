//temp database
const recipes = require("./db.json");

let globalId = 11;

//exportable object
module.exports = {


    getAllRecipes: (req, res) => 
        {
            res.status(200).send(recipes);
        },
  
    createRecipe: (req, res) => 
        {
            const {title,ingredients,instructions,imageUrl} = req.body;
            //console.log(req.body)
            let newRecipe = {
            id: globalId,
            title,
            ingredients,
            instructions,
            imageUrl,
            };
            recipes.push(newRecipe);
            res.status(200).send(recipes);
            globalId++;
        },
  
    deleteRecipe:(req,res) => 
    {
        let {id} = req.params

        let index = recipes.findIndex(recipe => recipe.id === +id)
        if(index === -1){
            res.status(400).send(`recipe not found`)
        } else {
            recipes.splice(index,1)
            res.status(200).send(recipes)
        }
    }
  

};