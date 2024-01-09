import React, { useState } from 'react';
import './RecipePage.css'; // You can create a separate CSS file for styling

const RecipePage = () => {
  const [recipe, setRecipe] = useState({
    title: 'Spaghetti Bolognese',
    ingredients: ['500g spaghetti', '400g minced beef', '1 onion', '2 cloves garlic', '400g tomato sauce'],
    instructions: 'Cook spaghetti according to package instructions. In a pan, sauté onions and garlic, add minced beef, cook until browned, then add tomato sauce. Serve over cooked spaghetti.',
    category: 'Pasta',
    image: 'images/spaghetti.jpg',
    creator: 'Chef John Doe',
  });

  return (
    <div className="single-recipe-page">
      <h1>{recipe.title}</h1>
      <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-details">
          <p>Category: {recipe.category}</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Instructions: {recipe.instructions}</p>
          <p>Creator: {recipe.creator}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;