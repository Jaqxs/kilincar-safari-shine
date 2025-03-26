
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Undo2, CheckCircle, Car, Droplets } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VehicleSelector from '@/components/vehicles/VehicleSelector';
import ServiceCard from '@/components/services/ServiceCard';
import AppointmentForm from '@/components/booking/AppointmentForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import {
  servicePackages,
  vehicleTypes,
} from '@/utils/dummyData';
import AnimatedIcon from '@/components/common/AnimatedIcon';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    searchParams.get('vehicle') || 'sedan'
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    searchParams.get('service') || 'basic'
  );
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Calculate service price based on selected vehicle
  const getServicePrice = (serviceId: string, vehicleId: string) => {
    const vehicle = vehicleTypes.find(v => v.id === vehicleId);
    const service = servicePackages.find(s => s.id === serviceId);
    
    if (!vehicle || !service) return 0;
    
    return Math.round(vehicle.basePrice * service.priceMultiplier);
  };
  
  // Update URL when selections change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('vehicle', selectedVehicleId);
    params.set('service', selectedServiceId);
    navigate(`/booking?${params.toString()}`, { replace: true });
  }, [selectedVehicleId, selectedServiceId, navigate]);
  
  // Handle vehicle selection
  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };
  
  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };
  
  // Handle booking completion
  const handleBookingComplete = () => {
    setBookingComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset booking
  const resetBooking = () => {
    setBookingComplete(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-12">
          {bookingComplete ? (
            // Booking confirmation screen
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto text-center py-12"
            >
              <div className="mb-6">
                <AnimatedIcon 
                  icon={CheckCircle} 
                  size={60} 
                  className="text-primary mx-auto" 
                  animation="pulse"
                />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-8">
                Your car wash appointment has been scheduled. You will receive a confirmation SMS shortly.
              </p>
              
              <div className="p-6 mb-8 border rounded-lg bg-muted/30 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <AnimatedIcon 
                    icon={Car} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                  <h3 className="font-medium">Booking Details</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Please save your booking reference:
                </p>
                <p className="font-mono bg-background px-4 py-2 rounded border inline-block font-medium">
                  #KLN{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              
              <div className="space-x-4">
                <Button 
                  variant="outline" 
                  className="rounded-full"
                  onClick={resetBooking}
                >
                  <Undo2 size={16} className="mr-2" /> Book Another Wash
                </Button>
                <Button 
                  className="rounded-full"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </div>
            </motion.div>
          ) : (
            // Booking form
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left column - Selections */}
              <div className="lg:col-span-7 space-y-10">
                <div className="text-center lg:text-left">
                  <Badge variant="outline" className="mb-3">Booking</Badge>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Book Your Car Wash
                  </h1>
                  <p className="text-muted-foreground">
                    Select your vehicle type, service package, and schedule your appointment.
                  </p>
                </div>
                
                {/* Vehicle selector */}
                <div>
                  <VehicleSelector 
                    selectedVehicleId={selectedVehicleId}
                    onChange={handleVehicleChange}
                  />
                </div>
                
                {/* Service selector */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-center">
                    Select Your Service Package
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {servicePackages.slice(0, 4).map((service, index) => (
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
                        selected={selectedServiceId === service.id}
                        onSelect={() => handleServiceSelect(service.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right column - Appointment form */}
              <div className="lg:col-span-5">
                <AppointmentForm 
                  vehicleId={selectedVehicleId}
                  serviceId={selectedServiceId}
                  totalPrice={getServicePrice(selectedServiceId, selectedVehicleId)}
                  onComplete={handleBookingComplete}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Booking;
