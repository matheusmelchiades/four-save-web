import React, { useState } from 'react';
import styled from 'styled-components';

import './style.css';

import logo from '../../assets/logo_horizontal.svg';

import {
    Toolbar,
    Container,
    Grid,
    Paper,
    TextField,
    Button
} from '@material-ui/core';

import constants from "../../language_constants";


const ToolbarStyled = styled(Toolbar)`
    background-color: #ffffff;
    box-shadow: 0 -3px 8px rgba(0,0,0,0.75);
`;

const ToolbarFooter = styled(Toolbar)`
    background: #0B8C75;
    color: #ffffff;
    span {
        display: block;
        width: 100%;
        text-align: center;
    }
`;

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

    const [language, setLanguage] = useState(localStorage.getItem('languagePreference') || 'EN');
    const translate = field => constants[field][language];

    const handleLanguage = (event) => {
        const language = event.target.value;

        localStorage.setItem('languagePreference', language);
        setLanguage(language);
    };

    return (
        <div>
            <Container className="login-content">
                <Paper className="paper">

                    <img src={logo} width="60%" className="logo" />

                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label="Username"
                        className="form-join-team-field"
                    />
                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label="Password"
                        type="password"
                        className="form-join-team-field"
                    />

                    <ButtonStyled
                        className="button-join form-join-team-field"
                    >
                        Sign-in
                    </ButtonStyled>

                </Paper>
            </Container>
        </div>
    );
}

export default Login;
