import React, { useState } from 'react';
import "./SideBar.css"

function SideBar(){/*
const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>

      <div className="sidebar">
        <h2>Sidebar Content</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Main Content</h1>
        <p>This is the main content area of your application.</p>
      </div>
    </div>
  );*/


    return (
        <div className="Meni">
            <ul className="KategorijeJela">
                <h4>Kategorije jela:</h4>
                <li><a>Kategorija primjer 1</a></li>
                <li><a>Kategorija primjer 2</a></li>
            </ul>
            <ul className="RegijaJela">
                <h4>Regije jela:</h4>
                <li><a>Regija primjer 1</a></li>
                <li><a>Regija primjer 2</a></li>
            </ul>
        </div>


    )
};

export default SideBar;