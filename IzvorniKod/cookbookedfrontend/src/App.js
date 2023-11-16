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
  );
}

const root= ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

export default App;
