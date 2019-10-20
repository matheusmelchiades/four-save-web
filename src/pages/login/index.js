import React, { useState } from 'react';
import styled from 'styled-components';

import './style.css';

import logo from '../../assets/logo_horizontal.svg';

import {
    Container,
    Paper,
    TextField,
    Button
} from '@material-ui/core';

import constants from "../../language_constants";

const ButtonStyled = styled(Button)`
    background: #0B8C75 !important;
    color: #ffffff !important;
    &.MuiButton-containedPrimary {
        background-color: #0B8C75 !important;
        color: #ffffff !important;
    }
    &.MuiButton-outlinedPrimary:hover,
    &.MuiButton-containedPrimary:hover {
        background-color: #0B8C75 !important;
    }
`;

const TextFieldStyled = styled(TextField)`
    .Mui-focused {
        color: #0B8C75 !important;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #0B8C75;
    }
`;

function Login() {

    const language = localStorage.getItem('languagePreference') || 'EN';
    const translate = field => constants[field][language];

    const [form, setForm] = useState({
        'username': '',
        'password': '',
    });

    const [error, setError] = useState('');

    const handleSubmit = async () => {

        try {
            const response = await fetch('http://ec2-3-93-220-13.compute-1.amazonaws.com:5000/login', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }).then(res => res.json());

            if (response.error)
                setError(response.error)

            localStorage.setItem('data', {
                logged: true,
                username: form.username,
                name: form.firstName + ' ' + form.lastName,
            });

            window.location.href = '/panel'

        } catch (e) {
            setError('Erro inesperado');
            console.log(e);
        }

        console.log(form);

    };

    return (
        <div>
            <Container className="login-content">
                <Paper className="paper">

                    <img src={logo} alt="4 SAVE" width="60%" className="logo" />

                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label={translate('FORM_USERNAME')}
                        value={form.username}
                        onChange={(event) => {
                            setForm({
                                ...form,
                                username: event.target.value,
                            })
                        }}
                        className="form-join-team-field"
                    />
                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label={translate('FORM_PASSWORD')}
                        type="password"
                        value={form.password}
                        onChange={(event) => {
                            setForm({
                                ...form,
                                password: event.target.value,
                            })
                        }}
                        className="form-join-team-field"
                    />

                    <ButtonStyled
                        className="button-join form-join-team-field"
                        onClick={handleSubmit}
                    >
                        {translate('FORM_LOGIN')}
                    </ButtonStyled>

                    <span>{error}</span>
                </Paper>
            </Container>
        </div>
    );
}

export default Login;
