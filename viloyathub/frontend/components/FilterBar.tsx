import React from 'react';

interface FilterBarProps {
  filters: {
    region: string;
    sector: string;
    amount: string;
  };
  onFilterChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange((prevFilters: any) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="filter-bar bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
      <select
        name="region"
        value={filters.region}
        onChange={handleInputChange}
        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Barcha hududlar</option>
        <option value="Toshkent">Toshkent</option>
        <option value="Samarqand">Samarqand</option>
        <option value="Buxoro">Buxoro</option>
        {/* Add other regions */}
      </select>
      
      <select
        name="sector"
        value={filters.sector}
        onChange={handleInputChange}
        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Barcha sohalar</option>
        <option value="IT">IT</option>
        <option value="Ta'lim">Ta'lim</option>
        <option value="Qishloq xo'jaligi">Qishloq xo'jaligi</option>
        {/* Add other sectors */}
      </select>
      
      <select
        name="amount"
        value={filters.amount}
        onChange={handleInputChange}
        className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Barcha miqdorlar</option>
        <option value="10000">$10,000 gacha</option>
        <option value="50000">$50,000 gacha</option>
        <option value="100000+">$100,000 dan yuqori</option>
        {/* Add other amount ranges */}
      </select>
      
      <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Izlash
      </button>
    </div>
  );
};
