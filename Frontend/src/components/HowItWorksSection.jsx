import React from 'react';
import StepCard from './StepCard';

const HowItWorksSection = () => {
  const steps = [
    { step: 'Step 1', title: 'Sign Up', description: 'Create an account with your student email.' },
    { step: 'Step 2', title: 'Book a Ride', description: 'Choose your destination and confirm your booking.' },
    { step: 'Step 3', title: 'Enjoy Your Ride', description: 'Hop in and enjoy a safe and comfortable ride!' }
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="flex justify-center space-x-8">
        {steps.map((step, index) => (
          <StepCard key={index} step={step.step} title={step.title} description={step.description} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
