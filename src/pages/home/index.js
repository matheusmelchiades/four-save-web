import React, { useState } from 'react';
import styled from 'styled-components';

import constants from '../../language_constants';

import './style.css';

import logo from '../../assets/logo_horizontal.svg';
import imageHome from '../../assets/image-home.jpg';

import {
    Toolbar,
    Container,
    Grid,
    Select,
    TextField,
    Button
} from '@material-ui/core';


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

const SelectStyled = styled(Select)`
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #08505B !important;
    }
`;

const ButtonMenuStyled = styled(Button)`
    color: #08505B;
    padding: 40px 15px !important;
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

function Home() {

    const [language, setLanguage] = useState(localStorage.getItem('languagePreference') || 'EN');
    const translate = field => constants[field][language];

    const handleLanguage = (event) => {
        const language = event.target.value;

        localStorage.setItem('languagePreference', language);
        setLanguage(language);
    };

    const [page, changePage] = useState('home');

    return (
        <div>
            <ToolbarStyled>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={2} sm={12}>
                            <img src={logo} height="100"/>
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
                            <SelectStyled
                                native
                                variant="outlined"
                                value={language}
                                onChange={handleLanguage}
                                className="select-language"
                            >
                                <option value="PT">Português</option>
                                <option value="EN">Inglês</option>
                            </SelectStyled>
                        </Grid>
                    </Grid>
                </Container>
            </ToolbarStyled>

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
                                onClick={event => changePage('provider')}
                                className="button-join"
                            >
                                {translate('FORM_PROFILE_PROVIDER')}
                            </ButtonStyled>

                            <h4>{translate('TEXT_RESGISTER_PROVIDER')}</h4>
                        </Grid>

                        <Grid item xs={6}>
                            <ButtonStyled
                                onClick={event => changePage('consumer')}
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

                            <TextFieldStyled
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_FIRST_NAME')}
                                className="form-join-team-field"
                            />
                            <TextFieldStyled
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_LAST_NAME')}
                                className="form-join-team-field"
                            />
                            <TextFieldStyled
                                variant="outlined"
                                fullWidth
                                label="Email"
                                className="form-join-team-field"
                            />

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
                                className="form-join-team-field"
                            />

                            <TextFieldStyled
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_ADDRESS')}
                                className="form-join-team-field"
                            />

                            <TextFieldStyled
                                variant="outlined"
                                fullWidth
                                label={translate('FORM_COUNTRY')}
                                className="form-join-team-field"
                            />

                            <ButtonStyled
                                onClick={event => changePage('faca-parte')}
                                className="button-join form-join-team-field"
                            >
                                {translate('MENU_FACA_PARTE')}
                            </ButtonStyled>

                        </Grid>
                    </Grid>
                ) : '' }


                {page === 'home' ? (
                    <Grid container spacing={3}>
                        <Grid item md={8} sm={12}>
                            <img src={imageHome} width="100%"/>
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
