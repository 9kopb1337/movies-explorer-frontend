import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutMe from '../AboutMe/AboutMe';
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';

export default function Main({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
