import React, { useState, useEffect } from 'react';
import { Toolbar, ToolbarFooter, Button, Select } from '../../components';
import { Container, Grid, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import api from '../../services';

import constants from '../../language_constants';
import logo from '../../assets/logo_horizontal.svg';

import './style.css';

const ButtonStyled = styled(Button)`
    background: #0b8c75 !important;
    color: #ffffff !important;
    &.MuiButton-containedPrimary {
        background-color: #0b8c75 !important;
        color: #ffffff !important;
    }
    &.MuiButton-outlinedPrimary:hover,
    &.MuiButton-containedPrimary:hover {
        background-color: #0b8c75 !important;
    }
`;

export default () => {
    /********/
    const [language, setLanguage] = useState(localStorage.getItem('languagePreference') || 'EN');
    const translate = field => constants[field][language];

    const handleLanguage = event => {
        const language = event.target.value;

        localStorage.setItem('languagePreference', language);
        setLanguage(language);
    };

    const [page, changePage] = useState('home');
    /***********/

    const [trashCategories, setTrashCategories] = useState([{ type: 'Selecione uma opção' }]);
    const [optionSelected, setOptionSelect] = useState(0);

    async function getTrashCategories() {
        try {
            const response = await api.get('/trashCategory');

            setTrashCategories([...trashCategories, ...response.data]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTrashCategories();
    }, []);

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
                            <ButtonStyled size="medium" onClick={event => changePage('home')}>
                                {translate('MENU_MORE')}
                            </ButtonStyled>

                            <ButtonStyled size="medium" onClick={event => changePage('faca-parte')}>
                                {translate('MENU_FACA_PARTE')}
                            </ButtonStyled>
                        </Grid>

                        <Grid item md={2} sm={4}>
                            <Select native variant="outlined" value={language} onChange={handleLanguage} className="select-language">
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
                        <Button onClick={() => {}}>Logout</Button>
                    </Grid>

                    <Grid item md={12} sm={12}>
                        <h2>Qual tipo de lixo você pretende armazenar para venda?</h2>
                    </Grid>

                    <Grid item md={6} sm={6}>
                        <Select
                            variant="outlined"
                            value={optionSelected}
                            onChange={e => setOptionSelect(e.target.value)}
                            className="select-language"
                        >
                            {trashCategories.map((trash, index) => (
                                <MenuItem value={index}>{trash.type}</MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item md={6} sm={6}>
                        <p>{trashCategories[optionSelected] ? trashCategories[optionSelected].description : ''}</p>
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
};
