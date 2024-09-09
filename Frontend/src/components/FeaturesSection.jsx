import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    { title: 'Easy Booking', description: 'Book your ride instantly with just a few clicks.' },
    { title: 'Ride Together', description: 'Coordinate rides with fellow students and save costs.' },
    { title: 'Trusted Drivers', description: 'All our drivers are verified and campus-friendly.' }
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose CampusCabs?</h2>
      <div className="flex justify-center space-x-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
