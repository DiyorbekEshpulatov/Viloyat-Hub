// frontend/src/components/Home/Features.tsx
import React from 'react';
import { FeatureCard } from '../UI/FeatureCard';
import { 
  SearchIcon, 
  ChatIcon, 
  MapIcon, 
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/outline';

const features = [
  {
    icon: SearchIcon,
    title: "Grant Navigator",
    description: "AI yordamida sizga mos grantlarni avtomatik toping",
    color: "green"
  },
  {
    icon: ChatIcon,
    title: "AI Mentor",
    description: "24/7 rejimda tadbirkorlik savollariga javob",
    color: "blue"
  },
  {
    icon: MapIcon,
    title: "Hududiy Xarita",
    description: "Viloyatingizdagi resurslar va imkoniyatlar",
    color: "purple"
  },
  {
    icon: ShoppingBagIcon,
    title: "Onlayn Bozor",
    description: "Mahalliy mahsulotlarni butun O‘zbekiston bo‘ylab sotish",
    color: "orange"
  },
  {
    icon: UsersIcon,
    title: "Mentorlik",
    description: "Toshkent va xorijiy ekspertlar bilan bog‘lanish",
    color: "red"
  },
  {
    icon: CurrencyDollarIcon,
    title: "Moliyalashtirish",
    description: "Mikrokredit, grant va investorlar bilan aloqa",
    color: "yellow"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Platforma Imkoniyatlari
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ViloyatHub sizga kerakli barcha vositalarni bir joyda taqdim etadi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};