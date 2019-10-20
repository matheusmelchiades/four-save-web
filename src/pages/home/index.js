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
                        <Grid item lg={2} md={3} sm={3} xs={12} className="logo">
                            <a href="/">
                                <img src={logo} alt="4SAVE" height="100" />
                            </a>
                        </Grid>

                        <Grid item lg={8} md={7} sm={9} xs={12}>
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


                        <Grid item lg={2} md={2} sm={2}>
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
                        <Grid item md={7} sm={12}>
                            <img src={imageHome} alt={translate('TITLE_HOME')} width="100%"/>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <h2>{translate('TITLE_HOME')}</h2>

                            <p>
                                Você sabia que cada ser humano junta em média de 1kg de lixo por dia?
                                E que que a cada ano chega em 25 mil toneladas de lixo no nosso oceano?
                                E já parou pra pensar que você pode ser um causador da poluição em nosso planeta?
                                Temos uma boa noticia para te dar, 80% da poluição que está acontecendo no mundo todo é por má gestão.
                            </p>

                            <p>
                                Junte-se com a gente nessa causa! Entre na comunidade 4Save e faça a diferença!
                                Acompanhe o impacto positivo que iremos causar no Mundo!
                                Iremos te mostrar em tempo real cruzando as suas informações com os dados da NASA,
                                assim você conseguirá gerenciar e contribuir o que você e sua comunidade estão fazendo para nosso planeta!
                            </p>

                            <p>
                                Por isso a 4Save tem como proposito conectar LIXO A PESSOAS” e com isto o objetivo é que você nos ajude a mudar a gestão e cultura do Lixo, assim você pode ser um “influenciador” nesta causa.
                            </p>

                        </Grid>

                        <Grid item xs={12}>
                            <h3>Como funciona o 4save?</h3>

                            <p>Iremos reunir em uma plataforma com compradores e vendedores de Lixo, você se cadastra escolhe sua categoria e começa a fazer parte dessa comunidade.</p>


                            <strong>Categorias:</strong>
                            <p>
                                <b>Comprador</b>, você estará ajudando ativamente nosso planeta reciclando materiais para sua mão de obra,
                                e o material sairá mais acessível financeiramente do que a matéria prima, tudo de forma prática e rápida de adquirir.
                            </p>

                            <p>
                                <b>Vendedor</b>, você destinará seu lixo domestico para um futuro certo, a reciclagem, e ainda será beneficiado por estar ajudando nosso planeta!
                                Como funciona?  Ao se cadastrar na plataforma 4save você escolhe com quais categorias você irá contribuir: lixo, espaço ou o deslocamento, a partir disto, você estará dentro de um sistema de pontuação que  irão gerar remuneração em dinheiro ou prêmios (em ciclos), cada vez que você concluir uma missão efetivada dentro da plataforma.

                                <ul>
                                    <li>Lixo: Todo lixo reciclável que você forneça, você poderá ofertar para alguém que irá reaproveita-lo. Ex.: Plástico, madeira, papel, etc; Ganhando mais pontuação por isso.</li>
                                    <li>Espaço: Se você tem um local de armazenamento em sua casa, você poderá fazer dele um canal de recebimento dos recicláveis e ponto de recolhimento.</li>
                                    <li>Deslocamento: Você poderá fazer o transporte do lixo de outras pessoas se já estiver no seu roteiro o percurso, ganhando mais pontuação por isso.</li></ul>
                            </p>

                            <p>
                                <b>Gerenciamento do Planeta:</b> Através da plataforma você conseguirá visualizar o % de lixo reduzido na sua região e no mundo; e mais que isso, você conseguirá acompanhar com a NASA o que isso está reduzindo em nosso mar e o impacto positivo para nosso planeta!
                            </p>

                            <p>
                                Na 4save você irá se conectar com pessoas, com a sua região e com pessoas do mundo todo, todos com um proposito único transformar a “nossa casa” o nosso planeta!!
                            </p>

                        </Grid>

                        <Grid item xs={12}>

                            <p>Vamos entrar nessa causa juntos?</p>
                            <p>Acesse e comece agora fazer a diferença para nosso planeta!!</p>

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
                                Com o uso do 4Save é possível visualizar o percentual de lixo reduzido por cidades, estados, países e no mundo, acompanhar junto a NASA o que isso está reduzindo de poluição em nosso mar e o impacto positivo para nosso planeta!
                                Os dados marítimos são fornecidos pela NASA e os dados de lixo (recolhidos e reciclados) através da comunidades 4Save, os dados são compilados e através do gerenciamento temos visualizações de relatórios atualizados e completos separado por ranking com resultados das regiões x população come % de resultados positivos.
                            </p>

                            <p>
                                Você sabia que grande parte dos dados da NASA são acessiveis ao público?
                                Você pode conferir alguns destes dados através dos links abaixo:

                            <ul>
                                <li>
                                    Catálogo de dados tabelados:
                                    <br />
                                    <a href="https://data.nasa.gov/browse">
                                        https://data.nasa.gov/browse
                                    </a>
                                </li>

                                <li>
                                    Dados sobre a terra: perspectiva visual
                                    <br />
                                    <a href="https://earthdata.nasa.gov/">
                                        https://earthdata.nasa.gov/
                                    </a>
                                </li>

                                <li>
                                    Observatório terrestre sob diferentes perspectivas e fenômenos
                                    <br />
                                    <a href="https://neo.sci.gsfc.nasa.gov/">
                                        https://neo.sci.gsfc.nasa.gov/
                                    </a>
                                </li>
                            </ul>
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
