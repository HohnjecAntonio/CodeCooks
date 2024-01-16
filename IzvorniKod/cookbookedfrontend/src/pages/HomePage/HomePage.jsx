import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKategorije } from '../../redux/auth/auth.action.js'; // Import the action
import './HomePage.css'; // You can create a separate CSS file for styling
import {fetchRecipesForUserFeed} from "../../redux/auth/auth.action";


const HomePage = () => {
    const dispatch = useDispatch();
    const kategorije = useSelector(state => state.auth.kategorije); 
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const recipesForFeed = useSelector(state => state.auth.recipesForFeed); 

    useEffect(() => {
        dispatch(fetchRecipesForUserFeed());
    }, [dispatch]);

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
  
  
    const [newRecipe, setNewRecipe] = useState({
      id: '',
      title: '',
      ingredients: '',
      instructions: '',
      category: '',
      creator: '',
      userID: ''
    });

    return (
        <div className='px-20'>
            <h1>Dobro došli na CookBooked!</h1>
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
            
            {recipesForFeed.map((recipe) => (
              <div key={recipe.idRecept} className="recipe-card">

                <a href="/RecipePage" onClick={()=>{localStorage.setItem('recipeToLoad',JSON.stringify(recipe.idRecept)); console.log(recipe.idRecept);}}>
                <div className="recipe-details">
                  <h2>{recipe.nazivRecept}</h2>
                  {/*<p>Category: {recipe.category}</p>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>*/}
                  <p>Uputstva: {recipe.priprema}</p>
                  <p>Autor: <a href="/Profile" onClick={() => {
                      localStorage.setItem('profileToLoad',JSON.stringify(recipe.autor))
                }}>{recipe.autor}</a></p>
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
