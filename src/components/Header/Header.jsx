import React from 'react';
import './Header.scss';
import Logo from '../../assets/icons/logo.png';

function Header() {
    return (
        <header className='header'>
            <a href='/'><img className='header__logo' src={Logo} alt='bold font in teal with green outline that reads FUN WITH AI' /></a>
            <h1 className='header__blurb'>Brought to you by the OpenAI GPT-3 API</h1>
        </header>
    );
}

export default Header;