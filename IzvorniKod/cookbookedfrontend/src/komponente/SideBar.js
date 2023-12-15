import React, { useState, useEffect } from 'react';
import "./SideBar.css"
import "./CategoryButtons.js"

function SideBar(){
    

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace 'YOUR_API_URL' with the actual API endpoint that provides categories
        const apiUrl = 'YOUR_API_URL';

        fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => setCategories(data))
        .catch((err) => setError(err.message));
    }, []);
    /*const sampleCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
        
    ];
    
    const [categories] = useState(sampleCategories);*/
    return (
        <div className="Meni">
            <ul className="KategorijeJela">
            <div>
                <div>
                <h2 style={{ fontSize: '40px', border: '10px', borderColor: '#000000' ,marginBottom:'30px'}}>KategorijeJela</h2>
                {error && <p>Error: {error}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap: '0px' }}>
                    {categories.map((category) => (
                    <button key={category.id} className="buttonconfi">
                        {category.name}
                    </button>
                    ))}
                </div>
                </div>
              </div>
            </ul>
            
            <ul className="RegijaJela">
                <h4 style={{ fontSize: '40px', border: '10px', borderColor: '#000000' ,marginBottom:'30px'}}>Regije jela:</h4>
                <li ><p>Regija primjer 1</p></li>
                <li ><p>Regija primjer 2</p></li>
            </ul>
        </div>
    )


}

export default SideBar;
