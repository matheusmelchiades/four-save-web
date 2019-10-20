import React from 'react';
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

    return (
        <div>
            <Container className="login-content">
                <Paper className="paper">

                    <img src={logo} alt="4 SAVE" width="60%" className="logo" />

                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label={translate('FORM_USERNAME')}
                        className="form-join-team-field"
                    />
                    <TextFieldStyled
                        variant="outlined"
                        fullWidth
                        label={translate('FORM_PASSWORD')}
                        type="password"
                        className="form-join-team-field"
                    />

                    <ButtonStyled
                        className="button-join form-join-team-field"
                    >
                        {translate('FORM_LOGIN')}
                    </ButtonStyled>

                </Paper>
            </Container>
        </div>
    );
}

export default Login;
