import React from "react";

function Login() {
    const [form, setForm] = React.useState({
        username: '',
        password: '',
    });

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
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data)
        }

        return fetch('/api/Login', options).then(
            console.log(data)
        ).catch(
            console.log("Error u prijavi")
        );
    }

    return (
        <div className="RegistracijaForma">
            <h2>Registracija novog korisnika</h2>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input name = "username" onChange={onChange} value={form.username}/>

                <label>Password:</label>
                <input name = "password" onChange={onChange} value={form.password}/>

                <button type = "submit">Register</button>
            </form>
        </div>
    );

}

export default Login;