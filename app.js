window.onload = () => {
    init();
}

function init() {
    document.getElementById('frmSearch').onsubmit = (e) => {
        e.preventDefault;
        searchMeal(document.getElementById('txtSearch').value);
    };
    document.getElementById('txtSearch').focus();
}

function searchMeal(txtSearch) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${txtSearch}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resJSON => processSearchResponse(resJSON))
        .catch(error => console.log(error));
}

function seachRandomMeal(){
    document.getElementById('txtSearch').value = "";
    document.getElementById('divSearchResult').innerHTML = '';
    document.getElementById('pSearchResult').innerHTML = 'No Result Available';
    document.getElementById('pSearchResult').setAttribute('class', 'text-danger');

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resJSON => processMealDetailResponse(resJSON.meals[0]))
        .catch(error => console.log(error));
}

function processSearchResponse(responseJSON) {
    let total = 0;
    document.getElementById('divSearchResult').innerHTML = '';
    if (responseJSON.meals != null) {
        let listMeals = responseJSON.meals;
        total = listMeals.length;
        listMeals.forEach(element => {
            createResultCard(element);
        });
    }
    document.getElementById('pSearchResult').innerHTML = `${total} result/s found`;
    document.getElementById('divCollapseResult').setAttribute('class', 'collapse show');
    document.getElementById('divCollapseMeal').setAttribute('class', 'collapse d-none');
    document.getElementById('aResult').innerHTML = "Meal";
    if(total == 0){
        document.getElementById('pSearchResult').setAttribute('class', 'text-warning font-weight-bold');
    }else{
        document.getElementById('pSearchResult').setAttribute('class', 'text-success font-weight-bold');
    }
}

function createResultCard(searchResult) {
    let divCard = document.createElement('div');
    let divCardBody = document.createElement('div');
    let imgCard = document.createElement('img');
    let pCard = document.createElement('h5');
    let btnShow = document.createElement('button');

    imgCard.setAttribute('src', searchResult.strMealThumb);
    imgCard.setAttribute('class', 'card-img-top img-fluid');

    pCard.innerHTML = searchResult.strMeal;
    pCard.setAttribute('class', 'card-title text-truncate');

    btnShow.innerHTML = "Show Details";
    btnShow.setAttribute('onclick', `showMealDetail(${searchResult.idMeal})`);
    btnShow.setAttribute('class', 'btn btn-info');

    divCardBody.setAttribute('class', 'card-block h-100');
    divCardBody.appendChild(pCard);
    divCardBody.appendChild(btnShow);
    
    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);
    divCard.setAttribute('class', 'card p-3');

    document.getElementById('divSearchResult').appendChild(divCard);
}

function showMealDetail(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resJSON => processMealDetailResponse(resJSON.meals[0]))
        .catch(error => console.log(error));
}

function processMealDetailResponse(mealResult) {
    document.getElementById('aResult').innerHTML = `Meal : ${mealResult.strMeal}`;
    document.getElementById('divCollapseResult').setAttribute('class', 'collapse');
    document.getElementById('divCollapseMeal').setAttribute('class', 'collapse show');
    
    document.getElementById('imgResult').setAttribute('src', mealResult.strMealThumb);
    document.getElementById('imgResult').setAttribute('alt', mealResult.strMeal);
    document.getElementById('imgResult').setAttribute('class', 'img-fluid');

    document.getElementById('pMealName').innerHTML = mealResult.strMeal;
    
    document.getElementById('pCategory').innerHTML = mealResult.strCategory;
    
    document.getElementById('pArea').innerHTML = mealResult.strArea;
    
    document.getElementById('pInstruction').innerHTML = mealResult.strInstructions;
    
    document.getElementById('pIngredients').innerHTML =
    `${mealResult.strMeasure1} ${mealResult.strIngredient1 + (mealResult.strIngredient2 != "" ? "," : "") } 
    ${mealResult.strMeasure2} ${mealResult.strIngredient2 + (mealResult.strIngredient3 != "" ? "," : "") } 
    ${mealResult.strMeasure3} ${mealResult.strIngredient3 + (mealResult.strIngredient4 != "" ? "," : "") } 
    ${mealResult.strMeasure4} ${mealResult.strIngredient4 + (mealResult.strIngredient5 != "" ? "," : "") } 
    ${mealResult.strMeasure5} ${mealResult.strIngredient5 + (mealResult.strIngredient6 != "" ? "," : "") } 
    ${mealResult.strMeasure6} ${mealResult.strIngredient6 + (mealResult.strIngredient7 != "" ? "," : "") } 
    ${mealResult.strMeasure7} ${mealResult.strIngredient7 + (mealResult.strIngredient8 != "" ? "," : "") } 
    ${mealResult.strMeasure8} ${mealResult.strIngredient8 + (mealResult.strIngredient9 != "" ? "," : "") } 
    ${mealResult.strMeasure9} ${mealResult.strIngredient9 + (mealResult.strIngredient10 != "" ? "," : "") } 
    ${mealResult.strMeasure10} ${mealResult.strIngredient10 + (mealResult.strIngredient11 != "" ? "," : "") } 
    ${mealResult.strMeasure11} ${mealResult.strIngredient11 + (mealResult.strIngredient12 != "" ? "," : "") } 
    ${mealResult.strMeasure12} ${mealResult.strIngredient12 + (mealResult.strIngredient13 != "" ? "," : "") } 
    ${mealResult.strMeasure13} ${mealResult.strIngredient13 + (mealResult.strIngredient14 != "" ? "," : "") } 
    ${mealResult.strMeasure14} ${mealResult.strIngredient14 + (mealResult.strIngredient15 != "" ? "," : "") } 
    ${mealResult.strMeasure15} ${mealResult.strIngredient15 + (mealResult.strIngredient16 != "" ? "," : "") } 
    ${mealResult.strMeasure16} ${mealResult.strIngredient16 + (mealResult.strIngredient17 != "" ? "," : "") } 
    ${mealResult.strMeasure17} ${mealResult.strIngredient17 + (mealResult.strIngredient18 != "" ? "," : "") } 
    ${mealResult.strMeasure18} ${mealResult.strIngredient18 + (mealResult.strIngredient19 != "" ? "," : "") } 
    ${mealResult.strMeasure19} ${mealResult.strIngredient19 + (mealResult.strIngredient20 != "" ? "," : "") } 
    ${mealResult.strMeasure20} ${mealResult.strIngredient20} `

    document.getElementById('iframeVideo').setAttribute('src', mealResult.strYoutube.replace('watch?v=', 'embed/'));
}