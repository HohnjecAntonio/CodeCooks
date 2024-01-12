import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije } from '../../redux/auth/auth.action.js'; // Import the action
import './HomePage.css'; // You can create a separate CSS file for styling


const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije); // Adjust path according to your store structure
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    useEffect(() => {
        dispatch(fetchKategorije());
    }, [dispatch]);

    const [recipes, setRecipes] = useState([
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
      {
          id: 5,
          title: 'Chicken Stir Fry',
          ingredients: ['400g chicken breast', '1 bell pepper', '1 broccoli', '2 tbsp soy sauce'],
          instructions: 'Slice chicken and vegetables. Stir-fry chicken until cooked, add vegetables and soy sauce. Cook until veggies are tender. Serve hot.',
          category: 'Asian',
          image: 'images/stir_fry.jpg',
          creator: 'New user',
          userID: '2'
        },
      // Add more recipe objects as needed
    ]);
  
    useEffect(() => {
      // Simulating fetching data from a server
      // In a real application, you would fetch data using something like fetch or Axios
      const fetchData = async () => {
        try {
          // Replace this with the actual endpoint to fetch recent recipes data
          const response = await fetch('/api/Recipes');
          const data = await response.json();
          setRecipes(data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchData();
    }, []);
  
  
    const [newRecipe, setNewRecipe] = useState({
      id: '',
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
        <div className='px-20'>
            <h1>This is home page visible to anyone.</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <h3 className='text-4xl mt-5 mb-3'>Kategorije</h3>
            <div>
                {kategorije.map(kategorija => (
                    <div key={kategorija.idKategorija}>
                        {kategorija.nazivKategorija}
                    </div>
                ))}
            </div>
            <div className="recipe-page">
          <h1>Recipes</h1>
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">

                <a href="/RecipePage" onClick={()=>{localStorage.setItem('recipeToLoad',JSON.stringify(recipe.id)); console.log(recipe.id);}}>

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
                      localStorage.setItem(localStorage.setItem('profileToLoad',JSON.stringify(recipe.userID)))
                }}>{recipe.creator}</a></p>
                </div>
                </a>
              </div>
            ))}
          </div>
      
    </div>
        </div>
    );
};

export default HomePage;
