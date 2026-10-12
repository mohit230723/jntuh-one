import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Shown when an API call fails, so the page never silently shows fake data.
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert" data-testid="error-state">
      <AlertTriangle size={20} aria-hidden="true" />
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="error-state-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
