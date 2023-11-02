import React from "react";
import "./Korisnik"
import Korisnik from "./Korisnik";
import "./KorisnikLista.css"

function  KorisnikLista(){
    const korisnici = [
        {KorisnickoIme: 'Ivica', LozinkaKorisnik: '123456789'},
        {KorisnickoIme: 'Marica', LozinkaKorisnik: '123456789'},
        {KorisnickoIme: 'Janica', LozinkaKorisnik: '123456789'},
        {KorisnickoIme: 'Nikica', LozinkaKorisnik: '123456789'}
    ]

    return (
        <div className = 'KorisnikLista'>
            { korisnici.map(korisnik => <Korisnik key = {korisnik.KorisnickoIme} korisnik = {korisnik}/>)}
        </div>
    )

}

export default KorisnikLista;