const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const single_mealEl = document.getElementById('single-meal')

//Search meal and fetch from API
function searchMeal (e) {
    e.preventDefault();
    // Clear single meal
    single_mealEl.innerHTML = '';
    const term = search.value;

    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML += '<p>No search results try again</p>'
                } else {
                    mealsEl.innerHTML = data.meals.map((meal) => {
                        return `<div class='meal'>
                        <img src=${meal.strMealThumb} alt='${meal.strMeal}'/>
                        <div class='meal-info' data-mealID=${meal.idMeal}>
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div>`
                    }).join('')
                }
            })
        //Clear search box
        search.value = ''
    } else {
        alert('Please enter a search term')
    }
}

//Add meal to DOM
function addMealToDOM (meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`)
        } else {
            break
        }
    }

    single_mealEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
     <img src=${meal.strMealThumb} alt='${meal.strMeal}'/>

    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` :''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` :''}
    </div>
    <div class="main">
    <p> ${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li class='ing'>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `
}

//Fetch meal by ID
function getMealById (mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            addMealToDOM(meal)
        })
}

submit.addEventListener('submit', searchMeal)

mealsEl.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID)
    }
})

