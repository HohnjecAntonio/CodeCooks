import React, { useState, useEffect } from 'react';
import './Home.css'; // You can create a separate CSS file for styling

const Home = (props) => {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    // Simulating fetching data from a server
    // In a real application, you would fetch data using something like fetch or Axios
    const fetchData = async () => {
      try {
        // Replace this with the actual endpoint to fetch recent recipes data
        const response = await fetch('/api/Recipes');
        const data = await response.json();
        setRecentRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: ['500g spaghetti', '400g minced beef', '1 onion', '2 cloves garlic', '400g tomato sauce'],
      instructions: 'Cook spaghetti according to package instructions. In a pan, sauté onions and garlic, add minced beef, cook until browned, then add tomato sauce. Serve over cooked spaghetti.',
      category: 'Pasta',
      image: 'images/spaghetti.jpg',
      creator: 'Chef John Doe',
      userID: '1'
    },
    {
      id: 2,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'Chef Jane Smith',
      userID: '1'
    },
    {
      id: 3,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'New user',
      userID: '2'
    },
    {
      id: 4,
      title: 'Chicken Stir Fry',
      ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
      instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
      category: 'Asian',
      image: 'images/stir_fry.jpg',
      creator: 'New user',
      userID: '2'
    },
    // Add more recipe objects as needed
  ];

  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: '',
    creator: '',
    userID: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    // Implement logic to add the new recipe to the list (e.g., send to server)
    console.log('New recipe added:', newRecipe);
    // For a real application, you would likely update the state with the new recipe
  };

  return (
    <div className="recipe-page">
      <h1>Recipes</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h2>{recipe.title}</h2>
              <p>Category: {recipe.category}</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p>Instructions: {recipe.instructions}</p>
              <p>Creator: <a href="/Profile" onClick={() => {
                  props.changeProfileID(recipe.userID);
            }}>{recipe.creator}</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;