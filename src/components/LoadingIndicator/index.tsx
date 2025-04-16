'use client';

import React from 'react';
// import './loading.css'; // atau bisa inline styling

export default function LoadingIndicator() {
  return (
    <div className="loading-container">
      <div className="dot dot1" />
      <div className="dot dot2" />
      <div className="dot dot3" />
    </div>
  );
}
