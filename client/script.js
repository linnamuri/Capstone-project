//This element in HTML will be holding recipe cards
const recipesContainer = document.getElementById('recipesContainer')

//End Points for Get, Create and Delete Recipes
const getrecipeURL =`http://localhost:4000/api/getallrecipes`
const postrecipeURL =`http://localhost:4000/api/createrecipe`
const deleterecipeURL =`http://localhost:4000/api/deleterecipe`

//Callback method after receiving response from server
const recipesCallback = ({ data: recipes }) => displayRecipes(recipes)

//Axios GET call to get all recipes
const getAllRecipes = () => axios.get(getrecipeURL).then(recipesCallback).catch(errCallback)

//Error Callback Method. This is called if the server is returning an error.
const errCallback = err => console.log(err.response.data)

//Axios POST call to create recipe
const createRecipe = body => axios.post(postrecipeURL, body).then(recipesCallback).catch(errCallback)

//Axios DELETE call to delete recipe
const deleteRecipe = id => axios.delete(`${deleterecipeURL}/${id}`).then(recipesCallback).catch(errCallback)

//This method is called when the Submit button is clicked for Create Recipe form. This function constructs the POST object and calls createRecipe method.
function submitHandler(e) {
    e.preventDefault()

    let title = document.getElementById('createRecipe_name')
    let ingredients = document.getElementById('createRecipe_ingredients')
    let instructions = document.getElementById('createrecipe_instructions')
    let imageUrl = document.getElementById('createRecipe_imgUrl')

    let bodyObj = {
        title: title.value,
        ingredients: ingredients.value, 
        instructions:instructions.value,
        imageUrl: imageUrl.value
    }

    createRecipe(bodyObj)

    title.value = ''
    ingredients.value = ''
    instructions.value = ''
    imageUrl.value = ''

    document.getElementById("recipe-form").style.display="none";
    document.getElementById("message").innerHTML="<br/><br/>Recipe added succesfully"

}

//This function is to create recipe cards and iterates through response JSON array received from server
function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('flip-card')

    recipeCard.innerHTML = 
            `<div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src=${recipe.imageUrl} width="500px" height="500px">
                    </div>
                    <div class="flip-card-back">
                      <br/><p class="card-text">Recipe Name: ${recipe.title}</p><br/>
                      <p class="card-text">Ingredients: <br/> ${recipe.ingredients}</p><br/>
                      <p class="card-text">Instructions: <br/>
                        ${recipe.instructions}</p>
                     <button type="button"  class="btn" id="deleteRecipeBtn" onclick=deleteRecipe(${recipe.id})>Delete Recipe</button>
                    </div>
                  </div>
                </div>`
    recipesContainer.appendChild(recipeCard)
}

//This is callback function that is called after receiving data from server
function displayRecipes(arr) {
    recipesContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createRecipeCard(arr[i])
    }
}

//This method is to show Create Recipe form
function showRecipeForm()
{
    document.getElementById("recipe-form").style.display="block"
}
document.getElementById("recipe-form").style.display="none"

form.addEventListener('submit', submitHandler)



