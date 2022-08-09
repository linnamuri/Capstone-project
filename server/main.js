const express = require('express')
const cors = require('cors')

const {getAllRecipes,createRecipe,deleteRecipe} = require('./controller')


//initialising new app with express
const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.get('/api/recipes', getAllRecipes)
app.post('/api/recipes', createRecipe)
app.delete('/api/recipes/:id',deleteRecipe)





//app.listen(4000, () => console.log("Server running on port 4000"));


const SERVER_PORT = 4000
app.listen(SERVER_PORT,() => console.log(`server running on ${SERVER_PORT}`))

