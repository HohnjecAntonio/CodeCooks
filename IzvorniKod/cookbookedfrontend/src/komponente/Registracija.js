import "./Registracija.css";
import React from "react";
import {useHistory} from "react-router-dom";

function Registracija(){

    const history = useHistory;
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
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString()
        }

        try {
            return fetch('/api/korisnici', options)
                .then(response => {
                    if (!response.ok){
                        alert("Registracija nije uspjela!");
                    }else {
                        alert("Registracija uspjela!");
                        history.push('/');
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