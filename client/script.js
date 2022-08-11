const recipesContainer = document.getElementById('recipesContainer')
const form = document.querySelector('form')

const getrecipeURL =`http://localhost:4000/api/getallrecipes`
const postrecipeURL =`http://localhost:4000/api/createrecipe`
const deleterecipeURL =`http://localhost:4000/api/deleterecipe`


const recipesCallback = ({ data: recipes }) => displayRecipes(recipes)
const getAllRecipes = () => axios.get(getrecipeURL).then(recipesCallback).catch(errCallback)
const errCallback = err => console.log(err.response.data)
const createRecipe = body => axios.post(postrecipeURL, body).then(recipesCallback).catch(errCallback)
const deleteRecipe = id => axios.delete(`${deleterecipeURL}/${id}`).then(recipesCallback).catch(errCallback)

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

function displayRecipes(arr) {
    recipesContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createRecipeCard(arr[i])
    }
}

function showRecipeForm()
{
    document.getElementById("recipe-form").style.display="block"
}
document.getElementById("recipe-form").style.display="none"

form.addEventListener('submit', submitHandler)



