import React from 'react';

interface Grant {
  id: string;
  title: string;
  organization: string;
  amount_min: number;
  amount_max: number;
  deadline: string;
  region: string;
  match_score?: number;
}

interface GrantCardProps {
  grant: Grant;
  highlighted?: boolean;
}

export const GrantCard: React.FC<GrantCardProps> = ({ grant, highlighted }) => {
  const cardClasses = `grant-card border rounded-lg p-4 flex flex-col justify-between ${highlighted ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`;

  return (
    <div className={cardClasses}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{grant.title}</h3>
          {grant.match_score && (
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {grant.match_score}%
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-1">{grant.organization}</p>
        <p className="text-sm text-gray-500 mb-3">📍 {grant.region}</p>
        <p className="text-md font-semibold text-green-700">
          ${grant.amount_min.toLocaleString()} - ${grant.amount_max.toLocaleString()}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-red-600">
          Deadline: {new Date(grant.deadline).toLocaleDateString()}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Batafsil
        </button>
      </div>
    </div>
  );
};
