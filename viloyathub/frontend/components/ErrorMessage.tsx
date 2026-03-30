import React from 'react';

interface ErrorMessageProps {
  error: Error | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Xatolik!</strong>
      <span className="block sm:inline ml-2">{error.message}</span>
    </div>
  );
};
