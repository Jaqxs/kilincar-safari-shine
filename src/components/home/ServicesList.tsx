
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, Sparkles, Star, CloudRain, Cloud } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { servicePackages } from '@/utils/dummyData';
import { cn } from '@/lib/utils';
import AnimatedIcon from '@/components/common/AnimatedIcon';

const iconMap: Record<string, any> = {
  'droplets': Droplets,
  'sparkles': Sparkles,
  'star': Star,
  'cloud-rain': CloudRain,
  'cloud': Cloud
};

const ServicesList: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Premium Car Wash Packages
          </h2>
          <p className="text-muted-foreground">
            Choose from our customized packages designed specifically for Tanzanian vehicles and conditions.
            Our services cater to all types of vehicles with special attention to local needs.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicePackages.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className={cn(
                "h-full border transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                service.seasonal && "border-kilimanjaro/30 bg-gradient-to-br from-transparent to-kilimanjaro/5",
                service.eco && "border-safari/30 bg-gradient-to-br from-transparent to-safari/5"
              )}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "p-3 rounded-xl",
                      `bg-${service.color}/10`
                    )}>
                      <AnimatedIcon 
                        icon={iconMap[service.icon] || Droplets} 
                        size={24} 
                        className={`text-${service.color}`} 
                      />
                    </div>
                    
                    {service.seasonal && (
                      <Badge variant="outline" className="border-kilimanjaro text-kilimanjaro bg-kilimanjaro/5">
                        Seasonal
                      </Badge>
                    )}
                    
                    {service.eco && (
                      <Badge variant="outline" className="border-safari text-safari bg-safari/5">
                        Eco-Friendly
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-xl mt-4 font-semibold">
                    {service.name}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="text-primary mt-1">✓</div>
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Duration
                      </div>
                      <div className="font-medium">
                        {service.duration} min
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-muted-foreground">
                        From
                      </div>
                      <div className="text-lg font-semibold">
                        {(10000 * service.priceMultiplier).toLocaleString()} TZS
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    asChild
                    variant="default" 
                    className="w-full rounded-full mt-2"
                  >
                    <Link to="/booking">
                      Book Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="rounded-full shadow-sm"
          >
            <Link to="/services">
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
