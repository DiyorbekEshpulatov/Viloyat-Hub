// frontend/src/components/Grants/GrantCard.tsx
import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';

interface GrantCardProps {
  grant: {
    id: string;
    title: string;
    organization: string;
    amount_min: number;
    amount_max: number;
    deadline: string;
    region: string;
    match_score?: number;
  };
  highlighted?: boolean;
}

export const GrantCard: React.FC<GrantCardProps> = ({ grant, highlighted = false }) => {
  const navigate = useNavigate();
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' UZS';
  };
  
  const isDeadlineSoon = new Date(grant.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  return (
    <div className={`
      rounded-xl p-6 transition-all hover:shadow-lg
      ${highlighted 
        ? 'border-2 border-green-400 bg-green-50' 
        : 'border border-gray-200 bg-white hover:border-green-200'
      }
    `}>
      {/* Match Score Badge */}
      {grant.match_score && (
        <div className="flex justify-end mb-2">
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            🎯 {grant.match_score}% mos
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {grant.title}
      </h3>
      
      {/* Organization */}
      <p className="text-gray-600 text-sm mb-3">
        {grant.organization}
      </p>
      
      {/* Amount */}
      <div className="mb-3">
        <span className="text-2xl font-bold text-green-600">
          {formatAmount(grant.amount_min)}
        </span>
        {grant.amount_max > grant.amount_min && (
          <span className="text-gray-500">
            {' '} - {formatAmount(grant.amount_max)}
          </span>
        )}
      </div>
      
      {/* Deadline */}
      <div className={`text-sm mb-4 ${isDeadlineSoon ? 'text-red-500' : 'text-gray-500'}`}>
        📅 {format(new Date(grant.deadline), 'dd MMMM yyyy')}
        {isDeadlineSoon && ' (yaqinlashmoqda)'}
      </div>
      
      {/* Region */}
      <div className="text-sm text-gray-500 mb-4">
        📍 {grant.region === 'all' ? 'Respublika' : grant.region}
      </div>
      
      {/* Button */}
      <Button
        variant={highlighted ? 'primary' : 'outline'}
        fullWidth
        onClick={() => navigate(`/grants/${grant.id}`)}
      >
        Ko‘rish
      </Button>
    </div>
  );
};