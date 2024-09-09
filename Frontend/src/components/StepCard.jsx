import React from 'react';

const StepCard = ({ step, title, description }) => {
  return (
    <div className="max-w-xs">
      <h3 className="text-xl font-semibold mb-4">{step}: {title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default StepCard;
