import React from 'react';
import { Hero } from '../components/Home/Hero';
import { Features } from '../components/Home/Features';
import { Stats } from '../components/Home/Stats';
import { CTASection } from '../components/Home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <Stats />
      <Features />
      <CTASection />
    </div>
  );
};