import React from "react";

function Korisnik(props){
    const{KorisnickoIme, LozinkaKorisnik} = props.korisnik

    return(
        <p>{KorisnickoIme} {LozinkaKorisnik}</p>
    );
}

export default Korisnik;