import React, { useState } from 'react';
import styled from 'styled-components';

import constants from '../../language_constants';

import './style.css';

import logo from '../../assets/logo_horizontal.svg';
import imageHome from '../../assets/image-home.jpg';

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



function Home() {

    const [language, setLanguage] = useState(localStorage.getItem('languagePreference') || 'EN');
    const translate = field => constants[field][language];

    const handleLanguage = (event) => {
        const language = event.target.value;

        localStorage.setItem('languagePreference', language);
        setLanguage(language);
    };

    const [page, changePage] = useState('home');

    const [form, setForm] = useState({
        'profile': '',
        'firstName': '',
        'lastName': '',
        'email': '',
        'username': '',
        'password': '',
        'address': '',
        'region': '',
        'country': '',
    });

    const [error, setError] = useState('');

    const handleSubmit = async () => {

        try {
            const perfilId = (form.profile === 'consumer') ? 3 : 2;
            const response = await fetch('http://ec2-3-93-220-13.compute-1.amazonaws.com:5000/user', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: form.firstName,
                    lastname: form.lastName,
                    email: form.email,
                    username: form.username,
                    password: form.password,
                    address: form.address,
                    region: form.region,
                    country: form.country,
                    latitude: 10,
                    longitude: 10,
                    perfilId,
                })
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

    };

    return (
        <div>
            <Toolbar>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={2} sm={12}>
                            <a href="/">
                                <img src={logo} alt="4SAVE" height="100" />
                            </a>
                        </Grid>

                        <Grid item md={8} sm={10}>
                            <ButtonMenuStyled size="medium" onClick={event => changePage('home')}>
                                {translate('MENU_MORE')}
                            </ButtonMenuStyled>

                            <ButtonMenuStyled size="medium" onClick={event => changePage('faca-parte')}>
                                {translate('MENU_FACA_PARTE')}
                            </ButtonMenuStyled>

                            <ButtonMenuStyled size="medium" onClick={event => changePage('visao-comunidade')}>
                                {translate('MENU_VISAO_COMUNITY')}
                            </ButtonMenuStyled>
                        </Grid>

                        <Grid item md={2} sm={2}>
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

                {page === 'faca-parte' ? (

                    <Grid container spacing={3} className="register-user-init">
                        <Grid item sm={12}>
                            <h2>{translate('TITLE_MEMBER')}</h2>
                        </Grid>

                        <Grid item sm={12}>
                            <h3>{translate('TEXT_MEMBER')}</h3>
                        </Grid>

                        <Grid item xs={6}>
                            <ButtonStyled
                                onClick={event => {
                                    changePage('provider');
                                    setForm({
                                        ...form,
                                        profile: 'provider',
                                    })
                                }}
                                className="button-join"
                            >
                                {translate('FORM_PROFILE_PROVIDER')}
                            </ButtonStyled>

                            <h4>{translate('TEXT_RESGISTER_PROVIDER')}</h4>
                        </Grid>

                        <Grid item xs={6}>
                            <ButtonStyled
                                onClick={event => {
                                    changePage('consumer');
                                    setForm({
                                        ...form,
                                        profile: 'consumer',
                                    })
                                }}
                                className="button-join"
                            >
                                {translate('FORM_PROFILE_CONSUMER')}
                            </ButtonStyled>

                            <h4>{translate('TEXT_RESGISTER_CONSUMER')}</h4>
                        </Grid>
                    </Grid>
                ): ''}

                {(page === 'provider' || page === 'consumer') ? (
                    <Grid container spacing={3} className="register-user-init">

                        <Grid item sm={12}>
                            {page === 'provider' ?
                                <h2>{translate('TITLE_RESGISTER_PROVIDER')}</h2>
                                :
                                <h2>{translate('TITLE_RESGISTER_CONSUMER')}</h2>}
                        </Grid>

                        <Grid item sm={12}>
                            <h4>{translate('TEXT_REGISTER_MEMBER')}</h4>
                        </Grid>

                        <Grid item xs={6} sm={12}>

                            <TextField
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_FIRST_NAME')}
                                value={form.firstName}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        firstName: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_LAST_NAME')}
                                value={form.lastName}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        lastName: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email"
                                value={form.email}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        email: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />

                            <TextField
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
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                label={translate('FORM_PASSWORD')}
                                value={form.password}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        password: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />

                            <TextField
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_ADDRESS')}
                                value={form.address}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        address: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />

                            <TextField
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_REGION')}
                                value={form.region}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        region: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />

                            <TextField
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_COUNTRY')}
                                value={form.country}
                                onChange={(event) => {
                                    setForm({
                                        ...form,
                                        country: event.target.value,
                                    })
                                }}
                                className="form-join-team-field"
                            />

                            <ButtonStyled
                                onClick={handleSubmit}
                                className="button-join form-join-team-field"
                            >
                                {translate('MENU_FACA_PARTE')}
                            </ButtonStyled>

                            <span>{error}</span>

                        </Grid>
                    </Grid>
                ) : '' }

                {page === 'home' ? (
                    <Grid container spacing={3}>
                        <Grid item md={8} sm={12}>
                            <img src={imageHome} alt={translate('TITLE_HOME')} width="100%"/>
                        </Grid>

                        <Grid item md={4} sm={12}>
                            <h2>{translate('TITLE_HOME')}</h2>

                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions of Lorem Ipsum.
                            </p>
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonStyled onClick={event => changePage('faca-parte')} className="button-join">
                                {translate('MENU_FACA_PARTE')}
                            </ButtonStyled>
                        </Grid>
                    </Grid>
                ) : ''}

                { page === 'visao-comunidade' ? (
                    <Grid container spacing={3}>

                        <Grid item md={12} sm={12}>
                            <h2>{translate('MENU_VISAO_COMUNITY')}</h2>

                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions of Lorem Ipsum.
                            </p>
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonStyled onClick={event => changePage('faca-parte')} className="button-join">
                                {translate('MENU_FACA_PARTE')}
                            </ButtonStyled>
                        </Grid>
                    </Grid>
                ) : ''}

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

export default Home;
