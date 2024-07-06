const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const searchFood = () =>{
    const searchField = document.getElementById('search-input-field');
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = '';
}

const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = ``;
    // console.log(meals);
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `
        mealContainer.appendChild(mealDiv);
    });
}

const loadMealDetails = mealId => {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal =>{
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = ``;
    const mealDiv = document.createElement('div');
    mealDiv.innerHTML = `
    <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <hr>
            <p class="card-text">Origin: ${meal.strArea}</p>
            <p class="card-text">Category: ${meal.strCategory}</p>
            <p class="card-text">Type of Food: ${meal.strTags}</p>
            <a href="#" class="btn btn-primary">Select Food</a>
        </div>
    </div>
    `;
    detailContainer.appendChild(mealDiv);
}

loadMeals('');