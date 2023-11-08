import "./App.css";
import Korisnik from "./components/Korisnik";
import KorisnikList from "./components/KorisnikList"
import KorisnikForm from "./components/KorisnikForm";

function App() {
    const korisnik = {
        korisnickoIme: "AntonioHohnjec",
        lozinkaKorisnik: "pass"
    }

  return (
      <div className= "App">
          <div className= "Box">
              <div className= "StupacKorisnika">
                  {/*<Korisnik korisnik = {korisnik}/>*/}
                  {/*<KorisnikList/>*/}
                  <KorisnikForm/>
              </div>
          </div>
      </div>
  );
}

export default App;
