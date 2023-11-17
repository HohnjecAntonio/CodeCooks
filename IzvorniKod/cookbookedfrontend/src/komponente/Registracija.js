import "./Registracija.css";
import React from "react";

function Registracija(){


    const [form, setForm] = React.useState({
       username: '',
       password: '',
       email: ''
    });

    const [error, setError] = React.useState('');

    function onChange(event){
        const {name, value} = event.target;
        setForm(oldForm => ({...oldForm, [name]: value}))
    }

    function onSubmit(){
        const data = {
            username: form.username,
            password: form.password,
            email: form.email
        };

        console.log(JSON.stringify(data));
        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            return fetch('/api/korisnici', options)
                .then(response => {
                    if (!response.ok){
                        alert("Registracija nije uspjela!");
                        response.redirect("/");
                    }else {
                        alert("Registracija uspjela!");
                        response.redirect("/");
                    }
                })
        } catch (err){
            alert("Registracija nije uspjela!");
        }
    }

    return (
        <div className="RegistracijaForma">
            <h2>Registracija novog korisnika</h2>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input name = "username" onChange={onChange} value={form.username}/>

                <label>Password:</label>
                <input name = "password" onChange={onChange} value={form.password}/>

                <label>Email:</label>
                <input name = "email" onChange={onChange} value={form.email}/>

                <button type = "submit">Register</button>
            </form>
        </div>
    );
}

export default Registracija;