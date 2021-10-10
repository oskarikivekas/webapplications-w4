
if(document.readyState !== "loading"){
    
    console.log("Document is ready");
    loadPage("Pizza");
} else {
    
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        loadPage("Pizza");
    })
}

//kirjota funktio jossa noi paskat päivitetää uusii arvoihi

function loadRecipe(search){
    const rname = document.getElementsByClassName('recipe-name')[0]
    const ingredients = document.getElementsByClassName('recipe-ingredients')[0]
    const instructions = document.getElementsByClassName('recipe-instructions')[0]
    fetchRecipe(search, rname, ingredients, instructions);

}

function loadPage(search) {
    
    const rname = document.createElement('h1');
    const ingredients = document.createElement('p');
    const instructions = document.createElement('p');
    rname.className = "recipe-name";
    ingredients.className = "recipe-ingredients";
    instructions.className = "recipe-instructions";

    fetchRecipe(search, rname, ingredients, instructions);

    const container = document.getElementById('view-container');
    container.appendChild(rname);
    container.appendChild(ingredients);
    container.appendChild(instructions);
}

async function fetchRecipe(search, rname, ingredients, instructions){
    console.log("hello")
    const response = await fetch(`http://localhost:1234/recipe/${search}`);
    const data = await response.json();
    rname.innerHTML = data.name;
    ingredients.innerHTML = data.ingredients;
    instructions.innerHTML = data.instructions;
    
}

let instructions = []
let ingredients = []

document.getElementById('add-ingredient').addEventListener('click', () => {
    const text = document.getElementById('ingredients-text').value;
    ingredients.push(text);
    console.log(ingredients);
}) 
document.getElementById('add-instruction').addEventListener('click', () => {
    const text = document.getElementById('instructions-text').value;
    instructions.push(text);
    console.log(instructions);
}) 

document.getElementById('submit').addEventListener('click', () => {
    //clear inputs
    document.getElementById('ingredients-text').value = "";
    document.getElementById('instructions-text').value = "";

    const name = document.getElementById('name-text').value;
    var jobject = {name: name, ingredients: ingredients, instructions: instructions};
    postrecipe(jobject);
    postImg();
});

document.getElementById('search').addEventListener('keyup', (e) => {
    let input = document.getElementById('search').value;
    console.log(input);
    if (e.key === 'Enter') {
        loadRecipe(input);
    }
})

function postImg(){
    const fileInput = document.getElementById('image-input');
    const files = fileInput.files;
    const fd = new FormData();
    Array.from(files).forEach(file => {
        fd.append('images', file);
    });
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log(xhr.response);
    }
    xhr.open('POST', 'http://localhost:1234/images');
    xhr.send(fd);
}

async function postrecipe(jobject) {
    
    var json = JSON.stringify(jobject)
    
    const settings = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: json
    };
    const response = await fetch('http://localhost:1234/recipe/', settings);
    const data = await response.json();
    console.log(response.status);
    
    if(response.status === 403){
        alert(data.msg);
    }
    
}

