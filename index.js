// 1. create search input box and button (html) & <ul> to hold search results
// 2. create a function that appends the HTML you want to display a search result to the ul
// 3. create a function to append a comment box to a search result item
// 4. Style all the above w/ css
// 5. Add JS to execute search to api when they click search button
// 6. Add JS to render results (call 2 and 3)

document.addEventListener("DOMContentLoaded", () => {
  searchForm()
     });
 
 function searchForm(){
   document.getElementById("search").addEventListener("click", (e) =>  {
     e.preventDefault();
     const byDrinks = document.getElementById('by-drink')
     const byLetter = document.getElementById('by-letter')
 
     if (byDrinks.checked){
       const string = document.querySelector("#search-item").value
       fetchdata(string);
     }
 
     if (byLetter.checked){
       const string = document.querySelector("#search-item").value
       fetchByLetter(string);
     }
   })
   const random = document.getElementById('random')
   random.addEventListener('click', () => {
     fetchRandom()
   })

  /*  const filterByAlcohol = document.getElementById('alcohol')
   filterByAlcohol.addEventListener('click', () => {
     fetchByAlcohol()
   })

   const filterByNonAlcohol = document.getElementById('non-alcohol')
   filterByNonAlcohol.addEventListener('click', () => {
    fetchByNonAlcohol()
  })
 } */
   
 
 function fetchdata(name) {
       fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
       .then(res => res.json())
       .then(data => renderCockTails(data));
 }
 
 function fetchByLetter(letter){
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
   .then(res => res.json())
   .then(data => renderCockTails(data))
 }
 
 function fetchRandom(){
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
   .then(res => res.json())
   .then(data => renderCockTails(data))
 }

 /* function fetchByAlcohol(){
   fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
   .then(res => res.json())
   .then(data => renderCockTails(data))
 }

 function fetchByNonAlcohol(){
  fetch('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
  .then(res => res.json())
  .then(data => renderCockTails(data))
} */
 
 function renderCockTails(data){
     data.drinks.forEach((drink) => {
      console.log(data)
       let likes = 0;
       const newDiv = document.createElement("div");
 
       const cocktailName = document.createElement("h2");
       cocktailName.innerText = drink.strDrink;
 
       const picture = document.createElement("img");
       picture.src = drink.strDrinkThumb;
 
       const recH4 = document.createElement("h4");
       recH4.innerText = "Recipe";
 
       const ingredients = document.createElement("ul");
       const ingredientArray = []
       for (let i=1; i<=15; i++) {
           if(!drink[`strIngredient${i}`]) {
               break;
           }
           const li = document.createElement('li');
           const liquor = drink[`strIngredient${i}`];
           const measurement = drink[`strMeasure${i}`];
           if(measurement) {
                 li.innerText = `${liquor} - ${measurement}` // Tequlia - 1.5oz
           } else {
               li.innerText = liquor;
           }
           ingredientArray.push(li);
         }
       ingredientArray.forEach(listElement => ingredients.append(listElement));
       const instructions = document.createElement("li");
       instructions.innerText = drink.strInstructions;
       ingredients.append(instructions);
 
       recH4.append(ingredients)
       newDiv.classList.add('recommendation-card')
 
         const likesDiv = document.createElement("div");
         const likesButton = document.createElement("button");
         likesButton.innerText = "Like";
         likesDiv.innerText = `${likes} Likes`;
 
         const comments = document.createElement("div");
         const commentInput = document.createElement("input");
         const commentBtn = document.createElement("button");
         commentBtn.innerText = "comment";
 
         newDiv.append(cocktailName, picture, recH4, likesDiv, likesButton, comments, commentInput, commentBtn);
         document.querySelector("#cocktail-card-container").append(newDiv);
 
         likesButton.addEventListener('click', function(){
           likes++
           likesDiv.innerText = `${likes} likes`
         })
 
         commentBtn.addEventListener("click", () => {
           const newComment = document.createElement("p");
           newComment.innerText = commentInput.value;
           comments.append(newComment);
         })
       })
     }
    }
     
     