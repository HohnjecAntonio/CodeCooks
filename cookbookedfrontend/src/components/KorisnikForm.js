import React from "react";
import "./KorisnikForm.css"

function KorisnikForm(){
    const [form, setForm] = React.useState({korisnickoIme:'', lozinkaKorisnik: ''});

    function onChange(event){
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm,[name]: value}))
    }

    function onSubmit(e){
        e.preventDefault();
        const data = {
            korisnickoIme: form.korisnickoIme,
            lozinkaKorisnik: form.lozinkaKorisnik
        };

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch('/korisnici', options);
    }

    return(
        <div className= "KorisnikForm">
            <h2>Novi korisnik</h2>
            <form onSubmit={onSubmit}>
                <div className="FormRow">
                    <label>Korisničko ime</label>
                    <input name = 'korisnickoIme' onChange={onChange} value={form.korisnickoIme}/>
                </div>
                <div className= "FormRow">
                    <label>Lozinka</label>
                    <input name = 'lozinkaKorisnik'/>
                </div>
                <button type = "submit">Registriraj</button>
            </form>
        </div>
    )
}

export default KorisnikForm;