import React from 'react';
import '../styles/globals.css';

const LoadingSpinner = ({ message = "Loading your wellness..." }) => (
  <div className="loading-container">
    <div className="spinner heartbeat"></div>
    <p>{message} 💖</p>
  </div>
);

export default LoadingSpinner;

