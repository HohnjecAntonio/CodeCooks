import React from "react";
import "./Login.css"
import {useHistory} from "react-router-dom";
function Login() {
    const history = useHistory;
    const [form, setForm] = React.useState({
        username: '',
        password: '',
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
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        console.log(JSON.stringify(data));

        return fetch('/api/Login', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bad credentials');
                }
                return response.text(); // Parse the JSON response
            })
            .then(dataR => {
                // Handle the data when the request is successful
                alert("Prijava uspjela!");
                history.push('/');
                console.log(dataR);
            })
            .catch(error => {
                // Handle any errors that occur during the fetch request
                console.error('There was a problem with login:', error);
                // You can perform error handling or show appropriate messages to the user
            });
    }

    return (
        <div className="LoginForma">
            <h2>Prijava korisnika</h2>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input name = "username" onChange={onChange} value={form.username}/>

                <label>Password:</label>
                <input name = "password" onChange={onChange} value={form.password}/>

                <button type = "submit">Login</button>
            </form>
        </div>
    );

}

export default Login;