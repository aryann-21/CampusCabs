import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg max-w-xs">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
