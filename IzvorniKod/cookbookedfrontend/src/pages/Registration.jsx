import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {Button, TextField} from '@mui/material';
import { registerUserAction } from '../redux/auth/auth.action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Registration.css'

const initialValues = {
    korisnickoIme: '',
    imeKorisnik: '',
    prezimeKorisnik: '',
    emailKorisnik: '',
    lozinkaKorisnik: '',
};

const Registration = () => {
    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (values) => {
        await dispatch(registerUserAction({ data: values })).then(() => {
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="korisnickoIme">
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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imeKorisnik">
                                    Ime
                                </label>
                                <Field
                                    as={TextField}
                                    name="imeKorisnik"
                                    placeholder="Ime..."
                                    type="text"
                                    variant="outlined"
                                    className="w-full"
                                />
                                <ErrorMessage name="imeKorisnik" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prezimeKorisnik">
                                    Prezime
                                </label>
                                <Field
                                    as={TextField}
                                    name="prezimeKorisnik"
                                    placeholder="Prezime..."
                                    type="text"
                                    variant="outlined"
                                    className="w-full"
                                />
                                <ErrorMessage name="prezimeKorisnik" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailKorisnik">
                                    Email
                                </label>
                                <Field
                                    as={TextField}
                                    name="emailKorisnik"
                                    placeholder="Email..."
                                    type="text"
                                    variant="outlined"
                                    className="w-full"
                                />
                                <ErrorMessage name="emailKorisnik" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lozinkaKorisnik">
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
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default Registration;
