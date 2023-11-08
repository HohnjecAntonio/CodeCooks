import React from "react"

function Korisnik(props){
    const {korisnickoIme, lozinkaKorisnik} = props.korisnik

    return (
        <p>{korisnickoIme} {lozinkaKorisnik}</p>
    );
}

export default Korisnik;