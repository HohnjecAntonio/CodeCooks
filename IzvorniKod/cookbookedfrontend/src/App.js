import './App.css';
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registracija from "./komponente/Registracija";
import Home from "./komponente/Home";
import Layout from "./komponente/Layout";
import Login from "./komponente/Login"
import NoPage from "./komponente/NoPage";

function App() {

  return (
      <div className="App">
          <div className="Header">
              <button className = "Header-button">Home</button>
              <button className = "Header-button">Prijava</button>
              <button className = "Header-button">Registracija</button>
          </div>
          <div className = "Box">
              <div className="Unos">
                  <Registracija/>
              </div>
          </div>


          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                      <Route index element={<Home/>} />
                      <Route path="Registracija" element={<Registracija/>} />
                      <Route path="Login" element={<Login/>} />
                      <Route path="*" element={<NoPage/>} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
