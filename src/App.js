import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("");
  const [YT, setYT] = useState("");
  const [image, setImage] = useState("");
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientMeasures, setIngredientMeasures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      const data = await response.json();
      const item = await data.meals[0];
      var itemKeys = Object.keys(await item);
      var ingredients = [];
      for (let i = 0; i < itemKeys.length; i++) {
        if (itemKeys[i].indexOf("strIngredient") !== -1) {
          if (
            item[itemKeys[i]] !== "" &&
            item[itemKeys[i]] !== " " &&
            item[itemKeys[i]] !== null
          ) {
            ingredients.push(item[itemKeys[i]]);
          }
        }
      }
      var ingredientMeasures = [];
      for (let i = 0; i < itemKeys.length; i++) {
        if (itemKeys[i].indexOf("strMeasure") !== -1) {
          if (
            item[itemKeys[i]] !== "" &&
            item[itemKeys[i]] !== " " &&
            item[itemKeys[i]] !== null
          ) {
            ingredientMeasures.push(item[itemKeys[i]]);
          }
        }
      }
      console.log(item);
      setTitle(await item.strMeal);
      setImage(await item.strMealThumb);
      setRecipe(await item.strInstructions);
      setYT(await item.strYoutube.replace("watch?v=", "embed/"));
      setIngredients(ingredients);
      setIngredientMeasures(ingredientMeasures);
    }
    fetchData();
  }, [click]);

  // console.log(title);
  // console.log(recipe);
  // console.log(ingredients);

  return (
    <>
      <div className="mainContainer">
        <button id="nextButton" onClick={() => setClick(!click)}>
          Next Dish
        </button>
        <div className="container1">
          {image ? (
            <>
              <img id="dishImage" src={image} alt="Dish Preview unavailable" />
              <br />
              <br />
            </>
          ) : (
            ""
          )}
          {title ? (
            <>
              <h3 id="title">{title}</h3>
              <br />
              <br />
            </>
          ) : (
            ""
          )}

          {ingredients ? (
            <div>
              <h3 className="heading">Ingredients:</h3>
              <ol>
                {ingredients.map((ing, i) => (
                  <li className="ingredients" key={i}>
                    {ing ? (
                      <>
                        {ing}: {ingredientMeasures[i]}
                      </>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            ""
          )}
        </div>

        <br />
      </div>

      {recipe ? (
        <>
          <h3 className="heading">Recipe:</h3>
          <span id="recipe">{recipe}</span>
          <br />
          <br />
        </>
      ) : (
        ""
      )}
      {YT ? (
        <>
          <h3 className="heading">YouTube Tutorial:</h3>
          <iframe
            title="Tutorial on YouTube"
            id="YTvideo"
            src={YT}
            allow="fullscreen;"
          ></iframe>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
