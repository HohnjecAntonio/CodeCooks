import React, { useState } from 'react';
import './RecipeForm.css'; // You can create a separate CSS file for styling

function RecipeForm () {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [],
    category: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientsChange = (e) => {
    const selectedIngredients = Array.from(e.target.selectedOptions, (option) => option.value);
    setRecipe({ ...recipe, ingredients: selectedIngredients });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRecipe({ ...recipe, image: selectedImage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic (e.g., send data to the server)
    console.log('Recipe submitted:', recipe);
  };

  return (
    <div className="recipe-form-container">
      <h1>Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Recipe Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={recipe.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="ingredients">Select Ingredients:</label>
        <select
          id="ingredients"
          name="ingredients"
          multiple
          value={recipe.ingredients}
          onChange={handleIngredientsChange}
          required
        >
          <option value="ingredient1">Ingredient 1</option>
          <option value="ingredient2">Ingredient 2</option>
          <option value="ingredient3">Ingredient 3</option>
          {/* Add more ingredients as needed */}
        </select>

        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          name="category"
          value={recipe.category}
          onChange={handleInputChange}
          required
        >
          <option value="appetizer">Appetizer</option>
          <option value="mainCourse">Main Course</option>
          <option value="dessert">Dessert</option>
          {/* Add more categories as needed */}
        </select>

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
