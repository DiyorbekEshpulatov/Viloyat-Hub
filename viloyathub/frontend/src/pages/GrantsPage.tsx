// frontend/src/pages/GrantsPage.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GrantCard } from '../components/Grants/GrantCard';
import { GrantFilters } from '../components/Grants/GrantFilters';
import { api } from '../lib/api';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';

interface Grant {
  id: string;
  title: string;
  organization: string;
  amount_min: number;
  amount_max: number;
  deadline: string;
  region: string;
  sectors: string[];
  description: string;
  match_score?: number;
}

export const GrantsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    region: '',
    sector: '',
    minAmount: '',
    maxAmount: '',
  });
  
  const [activeTab, setActiveTab] = useState<'all' | 'matched'>('all');
  
  const { data: grants, isLoading, error } = useQuery({
    queryKey: ['grants', filters],
    queryFn: () => api.getGrants(filters),
  });
  
  const { data: matchedGrants } = useQuery({
    queryKey: ['matched-grants'],
    queryFn: () => api.getMatchedGrants(),
    enabled: activeTab === 'matched',
  });
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  const displayGrants = activeTab === 'matched' ? matchedGrants : grants;
  
  return (
    <div className="grants-page max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Grant Navigator
        </h1>
        <p className="text-gray-600">
          AI yordamida sizga mos grantlarni toping va ariza topshiring
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'all'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Barcha grantlar
        </button>
        <button
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'matched'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('matched')}
        >
          🎯 Sizga mos grantlar
          {matchedGrants && matchedGrants.length > 0 && (
            <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
              {matchedGrants.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Filters */}
      <GrantFilters filters={filters} onFilterChange={setFilters} />
      
      {/* Grants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayGrants?.map((grant: Grant) => (
          <GrantCard key={grant.id} grant={grant} highlighted={activeTab === 'matched'} />
        ))}
      </div>
      
      {displayGrants?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Grantlar topilmadi</p>
        </div>
      )}
    </div>
  );
};