// src/Home.js
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
    <Header />
    <br />
    <br />
    <Hero />
    <Features />
    <Footer />
    </div>
  );
};

export default Home;
