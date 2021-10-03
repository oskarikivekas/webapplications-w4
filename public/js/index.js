

if(document.readyState !== "loading"){
    
    console.log("Document is ready");
    initializeCode();
} else {
    
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {
    
    
    const rname = document.createElement('h1');
    const ingredients = document.createElement('p');
    const instructions = document.createElement('p');
    rname.className = "recipe-name";
    ingredients.className = "recipe-ingredients";
    instructions.className = "recipe-instructions";


    fetchRecipe(rname, ingredients, instructions);

    const container = document.getElementById('view-container');
    container.appendChild(rname);
    container.appendChild(ingredients);
    container.appendChild(instructions);


}

async function fetchRecipe(rname, ingredients, instructions){
    console.log("hello")
    const response = await fetch(`http://localhost:1234/recipe/pizza`);
    const data = await response.json();
    console.log(data);
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
    //json {name: food, ing: array, ins: array}
    const name = document.getElementById('name-text').value;
    var jobject = {name: name, ingredients: ingredients, instructions: instructions};
    postrecipe(jobject);
    postImg();
});

/*async function postImg() {
    const imageform = new FormData();
    const fileInput = document.getElementById('image-input');
    const files = fileInput.files;
    for (let i=0; i<files.length; i++){
        imageform.append("images", files[0]);
        console.log(imageform);
    }

 
        
    
    const settings = {
        method: "POST",
        body: imageform
    }
    const response = await fetch('http://localhost:1234/images', settings);

}
 */  

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
    console.log(data);
    
}
