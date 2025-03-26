
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Car, 
  CheckCircle, 
  AlertCircle,
  Navigation
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedIcon from '@/components/common/AnimatedIcon';
import { locations } from '@/utils/dummyData';

const LocationMap: React.FC = () => {
  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-safari/5 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3">Locations</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Find Us Across Tanzania
          </h2>
          <p className="text-muted-foreground">
            Our wash centers and mobile units are strategically located to serve you better.
            Check our real-time availability and find the nearest location.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location cards */}
          <div className="space-y-6 lg:col-span-1">
            {locations.slice(0, 3).map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      {location.mobile ? (
                        <Badge className="bg-tanzanite text-white">Mobile</Badge>
                      ) : location.busy ? (
                        <Badge className="bg-clay text-white">Busy</Badge>
                      ) : (
                        <Badge className="bg-safari text-white">Available</Badge>
                      )}
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start space-x-3">
                        <MapPin size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                        <p className="text-sm">{location.address}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock size={16} className="text-muted-foreground flex-shrink-0" />
                        <p className="text-sm">{location.openingHours}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone size={16} className="text-muted-foreground flex-shrink-0" />
                        <p className="text-sm">{location.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-border">
                      <h4 className="text-sm font-medium mb-2">Available Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.services.map(service => (
                          <Badge 
                            key={service} 
                            variant="outline" 
                            className="bg-background text-xs"
                          >
                            {service === 'basic' ? 'Basic' : 
                             service === 'premium' ? 'Premium' : 
                             service === 'deluxe' ? 'Deluxe' : 
                             service === 'mud-buster' ? 'Mud Buster' : 
                             'Waterless'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4 rounded-full"
                    >
                      <Navigation size={14} className="mr-1" /> Get Directions
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full rounded-full"
            >
              View All Locations
            </Button>
          </div>
          
          {/* Map */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden border shadow-sm h-full min-h-[400px]">
              {/* Placeholder for a real map implementation */}
              <div className="absolute inset-0 bg-gradient-to-b from-kilimanjaro-light/20 to-transparent">
                <img 
                  src="https://i.imgur.com/2VdUbDU.png" 
                  alt="Map of Tanzania" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Location markers */}
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className={`absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2`}
                  style={{ 
                    top: `${15 + location.coordinates.lat * -8}%`, 
                    left: `${55 + location.coordinates.lng * 1}%` 
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className={`relative group cursor-pointer`}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center 
                      ${location.mobile ? 'bg-tanzanite' : location.busy ? 'bg-clay' : 'bg-safari'}
                      shadow-lg text-white
                    `}>
                      {location.mobile ? (
                        <Car size={18} />
                      ) : location.busy ? (
                        <AlertCircle size={18} />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                    </div>
                    
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-background shadow-lg rounded-lg px-3 py-2 text-xs font-medium">
                        {location.name}
                        <div className="absolute w-2 h-2 bg-background rotate-45 left-1/2 transform -translate-x-1/2 bottom-[-4px]"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-safari"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-clay"></div>
                  <span>Busy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-tanzanite"></div>
                  <span>Mobile Unit</span>
                </div>
              </div>
              
              {/* Solar tracker text */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border text-xs">
                <div className="flex items-center space-x-2">
                  <AnimatedIcon 
                    icon={Car} 
                    size={14} 
                    animation="pulse"
                    className="text-primary" 
                  />
                  <span>Solar-powered tracking active</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
