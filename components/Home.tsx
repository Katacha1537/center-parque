import React from 'react';
import Hero from './Hero';
import ProductSection from './ProductSection';
import StatsBar from './StatsBar';
import AboutSection from './AboutSection';
import Categories from './Categories';
import Testimonials from './Testimonials';
import CtaSection from './CtaSection';

const Home = () => {
  return (
    <>
      <Hero />
      <ProductSection />
      <StatsBar />
      <AboutSection />
      <Categories />
      <Testimonials />
      <CtaSection />
    </>
  );
};

export default Home;