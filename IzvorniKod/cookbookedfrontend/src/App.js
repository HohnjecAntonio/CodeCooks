import './App.css';
import axios from "axios";
import Registracija from "./komponente/Registracija";

function App() {

  return (
    <div className="App">
      <div className = "Box">
          <div className="Unos">
              <Registracija/>
          </div>
      </div>
    </div>
  );
}

export default App;
