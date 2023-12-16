import React from "react";
import "./Login.css"



function Login() {

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
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        console.log(JSON.stringify(data));

        try {
            return fetch('/api/Login', options)
                .then(response => {
                    if (!response.ok) {
                        alert("Prijava nije uspjela!");
                        response.redirect("/");
                    } else {
                        alert("Prijava uspjela!");
                        response.redirect("/");
                    }
                })
        }catch (err){
            alert("Prijava nije uspjela!");
        }
    }

    return (
        <div className="LoginForma">
            <h2>Prijava korisnika</h2>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input name = "username" onChange={onChange} value={form.username}/>

                <label>Password:</label>
                <input name = "password" onChange={onChange} value={form.password}/>     
            </form>
            
        </div>
        
    );

}

export default Login;