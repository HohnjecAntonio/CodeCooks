import React from "react";
import './App.css';
import Korisnik from "./components/Korisnik";
import KorisnikLista from"./components/KorisnikLista"

function App() {
    const korisnik = {
        KorisnickoIme: 'Ivica',
        LozinkaKorisnik: 'Ivic'
    }


    return (
        <div className="App">
            <KorisnikLista korisnici></KorisnikLista>
        </div>
    );
}

export default App;
