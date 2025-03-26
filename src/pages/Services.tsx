
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/services/ServiceCard';
import SeasonalOffers from '@/components/services/SeasonalOffers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  servicePackages, 
  vehicleTypes,
  luxuryAddOns,
} from '@/utils/dummyData';

const Services: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('sedan');
  
  // Calculate service prices based on selected vehicle
  const getServicePrice = (serviceId: string, vehicleId: string) => {
    const vehicle = vehicleTypes.find(v => v.id === vehicleId);
    const service = servicePackages.find(s => s.id === serviceId);
    
    if (!vehicle || !service) return 0;
    
    return Math.round(vehicle.basePrice * service.priceMultiplier);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow mt-20">
        {/* Hero section */}
        <section className="py-12 bg-gradient-to-b from-white to-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-3">Our Services</Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Premium Car Wash Packages
              </h1>
              <p className="text-muted-foreground mb-8">
                Choose from our specialized packages designed for Tanzanian vehicles and conditions. 
                From basic washing to luxury detailing, we have just what your car needs.
              </p>
              
              <div className="inline-flex space-x-2 p-1 bg-muted rounded-full">
                {vehicleTypes.map((vehicle) => (
                  <Button
                    key={vehicle.id}
                    variant={selectedVehicleId === vehicle.id ? "default" : "ghost"}
                    className="rounded-full"
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                  >
                    {vehicle.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Services grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePackages.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  features={service.features}
                  icon={service.icon}
                  color={service.color}
                  duration={service.duration}
                  price={getServicePrice(service.id, selectedVehicleId)}
                  seasonal={service.seasonal}
                  eco={service.eco}
                  onSelect={() => {
                    // Navigate to booking with selected service and vehicle
                    window.location.href = `/booking?service=${service.id}&vehicle=${selectedVehicleId}`;
                  }}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Weather and seasonal section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <SeasonalOffers />
              
              <div className="space-y-6">
                <Badge variant="outline" className="mb-3">Luxury Add-ons</Badge>
                <h2 className="text-2xl font-bold mb-4">Premium Detailing</h2>
                <p className="text-muted-foreground mb-6">
                  Our premium add-ons are specially designed for luxury vehicles and those who want extra care for their car.
                </p>
                
                <div className="space-y-4">
                  {luxuryAddOns.map((addOn, index) => (
                    <motion.div
                      key={addOn.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white rounded-lg p-4 border shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-tanzanite/10 rounded-full">
                            <Sparkles size={18} className="text-tanzanite" />
                          </div>
                          <div>
                            <h3 className="font-medium text-base">{addOn.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {addOn.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold">{addOn.price.toLocaleString()} TZS</div>
                          <div className="text-xs text-muted-foreground">
                            +{addOn.duration} mins
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Book Your Car Wash?</h2>
            <p className="max-w-xl mx-auto mb-8">
              Choose your preferred service package and schedule an appointment at one of our locations.
            </p>
            <Button 
              asChild
              size="lg" 
              variant="secondary" 
              className="rounded-full bg-white text-primary hover:bg-white/90"
            >
              <Link to="/booking">
                Book Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
