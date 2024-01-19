import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {Button, createTheme, TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../redux/auth/auth.action';
import { useHistory } from 'react-router-dom';
import './Login.css'

const initialValues = { korisnickoIme: '', lozinkaKorisnik: '' };

const Login = () => {
    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (values) => {
        console.log('handle submit ', values);
        await dispatch(loginUserAction({ data: values })).then(() => {
            history.push('/user-feed');
            window.location.reload();
        });
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    <Form className="w-full max-w-md">
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="korisnickoIme"
                                >
                                    Korisničko ime
                                </label>
                                <Field
                                    as={TextField}
                                    name="korisnickoIme"
                                    placeholder="Korisničko ime..."
                                    type="text"
                                    variant="outlined"
                                    className="w-full"
                                />
                                <ErrorMessage name="korisnickoIme" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="lozinkaKorisnik"
                                >
                                    Lozinka
                                </label>
                                <Field
                                    as={TextField}
                                    name="lozinkaKorisnik"
                                    placeholder="Lozinka..."
                                    type="password"
                                    variant="outlined"
                                    className="w-full"
                                />
                                <ErrorMessage name="lozinkaKorisnik" component="div" className="text-red-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    sx={{ padding: '.8rem 9rem', backgroundColor: '#388E3C' }}
                                    className="w-full bg-green-700 btn"
                                    color="violet"
                                    type="submit"
                                    variant="container"
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default Login;
