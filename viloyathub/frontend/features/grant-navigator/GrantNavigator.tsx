import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query'; // You will need to set up @tanstack/react-query
import { GrantCard } from '../../components/GrantCard';
import { FilterBar } from '../../components/FilterBar';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { api } from '../../lib/api';

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

// Mock hook since we don't have react-query installed yet
const useQuery = (options: any) => {
    const [data, setData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setIsLoading(true);
        options.queryFn()
            .then((res: any) => setData(res))
            .catch((err: any) => setError(err))
            .finally(() => setIsLoading(false));
    }, [options.queryKey.join('-')]);

    return { data, isLoading, error };
}


export const GrantNavigator: React.FC = () => {
  const [filters, setFilters] = useState({
    region: '',
    sector: '',
    amount: '',
  });

  const { data: grants, isLoading, error } = useQuery({
    queryKey: ['grants', filters],
    queryFn: () => api.getGrants(filters),
  });

  const { data: matchedGrants } = useQuery({
    queryKey: ['matched-grants'],
    queryFn: () => api.getMatchedGrants(),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grant-navigator">
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {matchedGrants && matchedGrants.length > 0 && (
        <section className="matched-grants">
          <h2 className="text-xl font-bold mb-4">
            🎯 Sizga mos grantlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedGrants.map((grant: Grant) => (
              <GrantCard key={grant.id} grant={grant} highlighted />
            ))}
          </div>
        </section>
      )}

      <section className="all-grants">
        <h2 className="text-xl font-bold mb-4">
          📋 Barcha grantlar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grants && grants.map((grant: Grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      </section>
    </div>
  );
};
