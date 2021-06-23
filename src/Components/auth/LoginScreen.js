import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';

import { Email, Lock } from '../../assets/icons'; 

const validate = ( formValues ) => {

    const errors = {};
    const { email, password } = formValues;

    if ( !email ) {
        errors.email = 'El email es obligatorio';
    } 

    if ( !password ) {
        errors.password = 'La password es obligatoria';
    }

    if ( email !== 'challenge@alkemy.org' || password !== 'react' ) {
        errors.msg = 'Los datos ingresados son incorrectos'
    }

    return errors;
}


export const LoginScreen = ( { setToken } ) => {

    const [ showError, setShowError ] = useState( false )

    const formik = useFormik({

        initialValues: {
          email: 'challenge@alkemy.org',
          password: 'react',
        },
        validate,
        onSubmit: async( formValues ) => {

            
            try {
                const { email, password } = formValues;
                
                const res = await axios({
                    method: 'post',
                    url: 'http://challenge-react.alkemy.org/',
                    data: {
                        email,
                        password
                    }
                })

                if ( res.status === 200 ) {

                    const { token } = res.data;

                    localStorage.setItem( 'token', token );
                    setToken( token );
                } else {
                    setShowError( true );
                }

            } catch ( error ) {
                console.error( error );
            }
        },
    });

    return (
        <main className="login_screen">
            <div className="container" >
                <div className="row">
                    <form
                        className="col-9 col-md-12 login__form"
                        onSubmit={ formik.handleSubmit }
                    >

                        <h1 className="title">Hero App</h1>

                        <div className="input-container">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="input login-input"
                                placeholder="Email"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.email }
                                autoComplete="off"
                            />
                            <Email />
                        </div>
                        <div className="input-container">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="input login-input"
                                placeholder="Contraseña"
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                value={ formik.values.password }
                                autoComplete="off"
                            />
                            <Lock />
                        </div>
                        <button
                            className="btn input"
                            type="submit"
                            disabled={ false }
                        >
                            Enviar
                        </button>

                        <div className="error-container">
                            {
                                ( formik.errors.email && formik.touched.email ) &&
                                    <div className="alert alert-warning"> { formik.errors.email } </div>
                            }
    
                            {
                                ( formik.errors.password && formik.touched.password ) &&
                                    <div className="alert alert-warning"> { formik.errors.password } </div>
                            }
    
                            {
                                ( formik.errors.msg && ( formik.touched.email || formik.touched.password ) ) &&
                                    <div className="alert alert-warning"> { formik.errors.msg } </div>
                            }

                            {
                                ( showError ) &&
                                    <div className="alert alert-danger"> Hubo un error, inténtelo más tarde. </div>
                            }
                        </div>
                    
                    </form>
                </div>
            </div>
        </main>
    )
}
