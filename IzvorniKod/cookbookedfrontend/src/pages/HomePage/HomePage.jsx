import React, { useState, useEffect } from 'react';
import './HomePage.css'; // You can create a separate CSS file for styling

const HomePage = () => {
    const [recentRecipes, setRecentRecipes] = useState([]);

    useEffect(() => {
        // Simulating fetching data from a server
        // In a real application, you would fetch data using something like fetch or Axios
        const fetchData = async () => {
            try {
                // Replace this with the actual endpoint to fetch recent recipes data
                const response = await fetch('https://api.example.com/recent-recipes');
                const data = await response.json();
                setRecentRecipes(data);
            } catch (error) {
                console.error('Error fetching recent recipes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home-page">
            <h1>Recent Recipes</h1>
            <div className="recipe-list">
                {recentRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        <div className="recipe-details">
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <p>Category: {recipe.category}</p>
                            <button>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;