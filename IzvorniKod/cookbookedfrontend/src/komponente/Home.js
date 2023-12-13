import React, { useState, useEffect } from 'react';

import "./Home.css"
import SideBar from "./SideBar";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

      useEffect(() => {
        // Simulating fetching data from a server
        // In a real application, you would fetch data using something like fetch or Axios
        const fetchData = async () => {
          try {
            // Replace this with the actual endpoint to fetch recipe data
            const response = await fetch('https://api.example.com/recipes');
            const data = await response.json();
            setRecipes(data);
          } catch (error) {
            console.error('Error fetching recipes:', error);
          }
        };

        fetchData();
      }, []);

      return (
        <div className="home-page">
          <h1>Recipe Collection</h1>
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>Category: {recipe.category}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Home;