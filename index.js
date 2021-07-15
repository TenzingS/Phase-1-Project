// 1. create search input box and button (html) & <ul> to hold search results
// 2. create a function that appends the HTML you want to display a search result to the ul
// 3. create a function to append a comment box to a search result item
// 4. Style all the above w/ css
// 5. Add JS to execute search to api when they click search button
// 6. Add JS to render results (call 2 and 3)

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  document.querySelector("button").addEventListener("click", function () {
    event.preventDefault();
    console.log("hi");
    document.querySelectorAll(".recommendation-card").forEach((item) => item.remove());
    fetchdata(document.querySelector("#search-item").value);
  });
});
function fetchdata(string) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${string}`)
    .then((res) => res.json())
    .then((data) => renderCocktails(data));
}

function renderCocktails(data) {

  console.log(data);
  if (!data.drinks) {
    const sorry = document.createElement("div");
    sorry.innerText = "Sorry, we found no cocktails matching your search criteria. Please try again.";
    sorry.id = 'sorry'
    document.querySelector("#cocktail-card-container").append(sorry);
    return;
  }
  data.drinks.forEach((drink) => {
    document.querySelector('#sorry').remove()
    let likes = 0;
    const newDiv = document.createElement("div");

    const cocktailName = document.createElement("h2");
    cocktailName.innerText = drink.strDrink;

    // add img
    const picture = document.createElement("img");
    picture.src = drink.strDrinkThumb;

    const recH4 = document.createElement("h4");
    recH4.innerText = "Recipe";

    const ingredients = document.createElement("ul");
    const ingredientArray = [];
    for (let i = 1; i <= 15; i++) {
      if (!drink[`strIngredient${i}`]) {
        break;
      }
      const li = document.createElement("li");
      const liquor = drink[`strIngredient${i}`];
      const measurement = drink[`strMeasure${i}`];
      if (measurement) {
        li.innerText = `${liquor} - ${measurement}`; // Tequlia - 1.5oz
      } else {
        li.innerText = liquor;
      }

      ingredientArray.push(li);
      ingredientArray.forEach((listElement) => ingredients.append(listElement));
    }
    const instructions = document.createElement("li");
    instructions.innerText = drink.strInstructions;
    ingredients.append(instructions);

    recH4.append(ingredients);
    newDiv.classList.add("recommendation-card");

    const likesDiv = document.createElement("div");
    const likesButton = document.createElement("button");
    const comments = document.createElement("div");
    const commentInput = document.createElement("input");
    const commentBtn = document.createElement("button");
    likesButton.innerText = "like it";
    likesDiv.innerText = `${likes} likes`;
    commentBtn.innerText = "comment";

    newDiv.append(cocktailName, picture, recH4, likesDiv, likesButton, comments, commentInput, commentBtn);
    document.querySelector("#cocktail-card-container").append(newDiv);

    commentBtn.addEventListener("click", function () {
      const newComment = document.createElement("p");
      newComment.innerText = commentInput.value;
      comments.append(newComment);
    });
    likesButton.addEventListener("click", function () {
      likes++;
      likesDiv.innerText = `${likes} likes`;
    });
  });
}

