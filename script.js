const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const categoryColors = {
    Beef: { background: '#6f5647', color: '#f7efe9' },
    Breakfast: { background: '#b79f73', color: '#fffaf0' },
    Chicken: { background: '#a56f52', color: '#fdf4ee' },
    Dessert: { background: '#8f6a7a', color: '#fbf3f7' },
    Goat: { background: '#7a7d84', color: '#f5f6f8' },
    Lamb: { background: '#8a6758', color: '#fbf3ee' },
    Miscellaneous: { background: '#5f7d79', color: '#f1f8f7' },
    Pasta: { background: '#a59262', color: '#fcf8ec' },
    Pork: { background: '#8d6671', color: '#fbf3f5' },
    Seafood: { background: '#3c6c82', color: '#f2f8fb' },
    Side: { background: '#7c8b61', color: '#f6f8f1' },
    Starter: { background: '#9a725f', color: '#fcf4ef' },
    Vegan: { background: '#5f8067', color: '#f2f8f3' },
    Vegetarian: { background: '#6b8661', color: '#f4f8f1' }
};

const getCategoryStyle = (category) => {
    const palette = categoryColors[category] || { background: '#1d1d1d', color: '#fff4df' };
    return `background:${palette.background};color:${palette.color};`;
};

// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML =`
             <img src="${meal.strMealThumb}">
             <h3> ${meal.strMeal} </h3>
             <div class="recipe-tags">
                <span class="recipe-tag area-tag">${meal.strArea}</span>
                <span class="recipe-tag category-tag" style="${getCategoryStyle(meal.strCategory)}">${meal.strCategory}</span>
             </div>
        `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

        //Adding addEventListener to recipe butoon
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });

            recipeContainer.appendChild(recipeDiv);
    });

    }
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }

} 

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    console.log('meal::::', meal)
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2> Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Buttom Clicked")
});

// let fisrtName = 'aung';
// let lastName = "ps";

// // string concatination
// console.log('first name is '+fisrtName +' and the last name is ' + lastName)

// // string interpolation

// console.log(`first name is ${fisrtName} and the last name is ${lastName}`)

// function sum() {
//     retrun
// }

// let name = 'aps' 

// let div = () => {

// }
