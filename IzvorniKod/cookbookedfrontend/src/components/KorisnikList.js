import React from "react"
import Korisnik from "./Korisnik";

function KorisnikList(){

    // const korisnici = [
    //     {korisnickoIme: "PeroPeric", lozinkaKorisnik: "pass"},
    //     {korisnickoIme: "IvoIvic", lozinkaKorisnik: "pass"}
    // ];

    // return (
    //     <div>
    //         {korisnici.map(korisnik =>
    //             <Korisnik key = {korisnik.korisnickoIme} korisnik = {korisnik}/>)}
    //     </div>
    // );

    const [korisnici, createKorisnik] = React.useState([]);

    React.useEffect(() => {
        fetch('/korisnici')
            .then(data => data.json())
            .then(korisnik => createKorisnik(korisnici))
    }, [])

    return (
        <div className= 'KorisnikList'>
            {
                korisnici.map( korisnik =>
                    <Korisnik key = {korisnik.korisnickoIme} korisnik = {korisnik}/>
                )
            }
        </div>
    );

}

export default KorisnikList