import React from 'react';

const Spinner = () => (
  <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
    <div 
      className="w-9 h-9 border-4 border-gray-200 border-l-blue-500 rounded-full animate-spin"
      style={{ borderLeftColor: '#3B82F6' }}
    />
  </div>
);

export default Spinner;