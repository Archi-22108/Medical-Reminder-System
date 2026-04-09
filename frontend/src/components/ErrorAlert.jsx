import React from 'react';
import '../styles/globals.css';

const ErrorAlert = ({ message, onDismiss }) => (
  <div className="error-message">
    <span>{message}</span>
    {onDismiss && (
      <button onClick={onDismiss} className="retry-btn" aria-label="Dismiss error">
        Try Again ✨
      </button>
    )}
  </div>
);

export default ErrorAlert;

