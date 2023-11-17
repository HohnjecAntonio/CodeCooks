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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch('/api/korisnici', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bad credentials');
                }
                return response.text(); // Parse the JSON response
            })
            .then(dataR => {
                // Handle the data when the request is successful
                alert("Registracija uspjela!");
                history.push('/');
                console.log(dataR);
            })
            .catch(error => {
                // Handle any errors that occur during the fetch request
                console.error('There was a problem with registration:', error);
                // You can perform error handling or show appropriate messages to the user
            });
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