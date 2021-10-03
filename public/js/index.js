
if(document.readyState !== "loading"){
    
    console.log("Document is ready");
    initializeCode();
} else {
    
    document.addEventListener("DOMrnameLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

initializeCode();


function initializeCode() {
    
    
    const rname = document.createElement('h1');
    const ingredients = document.createElement('p');
    const instructions = document.createElement('p');
    rname.className = "recipe-name";
    ingredients.className = "recipe-ingredients";
    instructions.className = "recipe-instructions";


    fetchRecipe(rname, ingredients, instructions);

    const container = document.getElementsByClassName('container')[0];
    container.appendChild(rname);
    container.appendChild(ingredients);
    container.appendChild(instructions);


}

async function fetchRecipe(rname, ingredients, instructions){
    console.log("hello")
    const response = await fetch(`http://localhost:1234/recipe/pizza`);
    const data = await response.json();
    console.log(data);
    rname.innerHTML = data.recipe.name;
    ingredients.innerHTML = data.recipe.ingredients;
    instructions.innerHTML = data.recipe.instructions;
    
}