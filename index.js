document.addEventListener("DOMContentLoaded", () => {
  searchForm()
     });
 
 function searchForm(){
   document.getElementById("search").addEventListener("click", (e) =>  {
      e.preventDefault();
      document.querySelectorAll(".recommendation-card").forEach((item) => item.remove());

      const string = document.querySelector("#search-item").value
      fetchdata(string);
      document.querySelector('#sorry').remove()
  })
  const random = document.getElementById('random')
      random.addEventListener('click', () => {
        document.querySelectorAll(".recommendation-card").forEach((item) => item.remove());
        fetchRandom()
   })
}

function fetchdata(name) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
  .then(res => res.json())
  .then(data => renderCockTails(data));
}

function fetchRandom(){
fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
.then(res => res.json())
.then(data => renderCockTails(data))
}

function renderCockTails(data) {
  if (!data.drinks) {
    const sorry = document.createElement("div");
    sorry.innerText = "Sorry, we found no cocktails matching your search criteria. Please try again.";
    sorry.id = 'sorry'
    document.querySelector("#cocktail-card-container").append(sorry);
    return;
  }
  data.drinks.forEach((drink) => {
    let likes = 0;
    const newDiv = document.createElement("div");

    const cocktailName = document.createElement("h2");
    cocktailName.innerText = drink.strDrink;

    const picture = document.createElement("img");
    picture.setAttribute("id","drinkImg");
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
        li.innerText = `${measurement} ${liquor}`; // 1.5oz Tequlia
      } else {
        li.innerText = liquor;
      }
      ingredientArray.push(li);
    }
    ingredientArray.forEach((listElement) => ingredients.append(listElement));
    
    linebreak = document.createElement("br");
    ingredients.appendChild(linebreak);

    const instructions = document.createElement("p");
    instructions.innerText = drink.strInstructions;
    instructions.style.fontWeight = 'bold';
    ingredients.append(instructions);

    recH4.append(ingredients);
    newDiv.classList.add("recommendation-card");

    const likesDiv = document.createElement("span");
    const likesButton = document.createElement("button");

    const comments = document.createElement("ul");
    const commentInput = document.createElement("input");
    commentInput.placeholder = "comment..."
    const commentBtn = document.createElement("button");
    commentBtn.innerText = "Submit";

    likesButton.innerText = "likes";
    likesDiv.innerText = `${likes} `;

    newDiv.append(cocktailName, picture, recH4, likesDiv, likesButton, comments, commentInput, commentBtn);
    document.querySelector("#cocktail-card-container").append(newDiv);

    commentBtn.addEventListener("click", function () {
      const newComment = document.createElement("p");
      newComment.innerText = commentInput.value;
      newComment.style.fontWeight = 'italics';
      comments.append(newComment);
      commentInput.value = ""
    });

    likesButton.addEventListener("click", function () {
      likes++;
      likesDiv.innerText = `${likes} `;
    });
  });
}

