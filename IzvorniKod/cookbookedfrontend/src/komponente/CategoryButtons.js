import React, { useState, useEffect } from 'react';
import './CategoryButtons.css'
const CategoryButtons = () => {
  /*const sampleCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    
  ];*/
  
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const apiUrl = '';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message));
  }, []);
  
  /*const [categories] = useState(sampleCategories);*/

  return (
    
      <div className='Forma'>
        <h2 style={{ fontSize: '75px' }}>Categories</h2>
        {error && <p>Error: {error}</p>}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              style={{
                margin: '20px',
                padding: '20px',
                backgroundColor: 'green',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '300px',
                textAlign: 'center',
              }}
            >
              <a href='./kat' style={{ fontSize: '25px', color: 'white' }}>{category.name}</a>
              
            </button>
          ))}
        </div>
      </div>
    
  );
};

export default CategoryButtons;

