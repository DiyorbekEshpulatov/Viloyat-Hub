// frontend/src/components/Home/Hero.tsx
import React from 'react';
import { Button } from '../UI/Button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          ViloyatHub
          <span className="text-green-600"> – Hududiy Innovatsion Ekotizim</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Toshkentdan tashqari 12 million aholiga tadbirkorlik imkoniyatini yaratamiz
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/register')}>
            Boshlash
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/grants')}>
            Grantlarni ko‘rish
          </Button>
        </div>
        
        {/* Stats Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="350K+" label="Biznes" />
          <StatCard number="12" label="Viloyat" />
          <StatCard number="$50M+" label="GDP o‘sishi" />
          <StatCard number="20K+" label="Yangi ish o‘rni" />
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-green-600">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);