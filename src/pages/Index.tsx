
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesList from '@/components/home/ServicesList';
import LocationMap from '@/components/home/LocationMap';
import LoyaltyPoints from '@/components/home/LoyaltyPoints';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header transparent />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Section */}
        <ServicesList />
        
        {/* Locations Map */}
        <LocationMap />
        
        {/* Loyalty Points Section */}
        <LoyaltyPoints />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
