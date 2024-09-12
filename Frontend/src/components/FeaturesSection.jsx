import React, { forwardRef } from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = forwardRef((props, ref) => {
  const features = [
    { title: 'Easy Booking', description: 'Book your ride instantly with just a few clicks.' },
    { title: 'Ride Together', description: 'Coordinate rides with fellow students and save costs.' },
    { title: 'Trusted Drivers', description: 'All our drivers are verified and campus-friendly.' },
    { title: 'Real-Time Updation', description: 'Track your ride in real-time and stay updated.' },
    { title: 'Affordable Pricing', description: 'Enjoy student-friendly fares tailored for campus rides.' },
    { title: '24/7 Support', description: 'Get help anytime with our around-the-clock customer service.' },
    { title: 'Multi-Stop Rides', description: 'Add multiple stops on the way to make rides more convenient.' },
    { title: 'Safe Rides', description: 'Safety features like driver ratings and live support for peace of mind.' }
  ];

  return (
    <section ref={ref} className="py-16 px-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose CampusCabs?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </section>
  );
});

export default FeaturesSection;
