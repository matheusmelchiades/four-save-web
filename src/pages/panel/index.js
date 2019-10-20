import React, { useState } from 'react';
import styled from 'styled-components';

import constants from '../../language_constants';

import './style.css';

import logo from '../../assets/logo_horizontal.svg';

import {
    Container,
    Grid,
    Button
} from '@material-ui/core';

import {
    Toolbar,
    ToolbarFooter,
    Select,
    TextField,
} from '../../components/index';


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


const ButtonMenuStyled = styled(Button)`
    color: #08505B;
    padding: 40px 15px !important;
`;


function Panel() {

    (() => {
        const loginData = localStorage.getItem('data');
        if (!loginData || loginData.logged === false)
            return window.location.href = '/';
    })();

    const [language, setLanguage] = useState(localStorage.getItem('languagePreference') || 'EN');
    const translate = field => constants[field][language];

    const handleLanguage = (event) => {
        const language = event.target.value;

        localStorage.setItem('languagePreference', language);
        setLanguage(language);
    };

    const logout = () => {
        localStorage.removeItem('data');
        window.location.href = '/';
    };

    const [page, changePage] = useState('home');

    return (
        <div>
            <Toolbar>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={2} sm={12}>
                            <a href="/">
                                <img src={logo} height="100" />
                            </a>
                        </Grid>

                        <Grid item md={8} sm={4}>
                            <ButtonMenuStyled size="medium" onClick={event => changePage('home')}>
                                {translate('MENU_MORE')}
                            </ButtonMenuStyled>

                            <ButtonMenuStyled size="medium" onClick={event => changePage('faca-parte')}>
                                {translate('MENU_FACA_PARTE')}
                            </ButtonMenuStyled>
                        </Grid>

                        <Grid item md={2} sm={4}>
                            <Select
                                native
                                variant="outlined"
                                value={language}
                                onChange={handleLanguage}
                                className="select-language"
                            >
                                <option value="PT">Português</option>
                                <option value="EN">Inglês</option>
                            </Select>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>

            <Container className="main-content">

                <Grid container spacing={3}>
                    <Grid item md={8} sm={12}>

                        <Button onClick={logout}>Logout</Button>

                    </Grid>

                    <Grid item md={12} sm={12}>
                        <h2>Bem Vindo!</h2>
                    </Grid>

                    <Grid item md={12} sm={12}>
                        <p>
                            {localStorage.getItem('data').name}, parabens por participar dessa iniciativa
                        </p>

                        <p>
                            Vamos à mais algumas perguntas para melhorar sua experiência no site.
                        </p>
                    </Grid>

                </Grid>


            </Container>

            <ToolbarFooter className="footer">
                <span>
                    {translate('TEXT_FOOTER').split('{icon}')[0]}
                    <i className="material-icons">favorite</i>
                    {translate('TEXT_FOOTER').split('{icon}')[1]}
                </span>
            </ToolbarFooter>
        </div>
    );
}

export default Panel;
