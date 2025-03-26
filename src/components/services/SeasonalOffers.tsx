
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, Droplets, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { weatherConditions, currentWeather } from '@/utils/dummyData';
import AnimatedIcon from '@/components/common/AnimatedIcon';
import { cn } from '@/lib/utils';

interface SeasonalOffersProps {
  className?: string;
}

const SeasonalOffers: React.FC<SeasonalOffersProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Get the current weather condition
  const currentCondition = weatherConditions.find(
    condition => condition.id === currentWeather.condition
  );

  const iconMap: Record<string, any> = {
    'sun': Sun,
    'cloud': Cloud,
    'cloud-rain': CloudRain,
    'wind': Wind
  };

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex justify-between items-center mb-4">
        <Badge variant="outline" className="mb-2">Tanzania Weather</Badge>
        <Button variant="ghost" size="sm" onClick={toggleExpand}>
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </div>
      
      <Card className="border shadow-sm relative overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-10",
          currentWeather.condition === 'sunny' ? "from-savannah-light to-savannah" : 
          currentWeather.condition === 'rainy' ? "from-tanzanite-light to-tanzanite" : 
          "from-muted to-secondary/10"
        )}>
        </div>
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Current Weather</h3>
              <p className="text-muted-foreground text-sm">Recommended service based on today's conditions</p>
            </div>
            <div className="p-3 bg-background/80 backdrop-blur-sm rounded-full">
              <AnimatedIcon 
                icon={iconMap[currentCondition?.icon || 'sun']} 
                size={28} 
                className={cn(
                  currentWeather.condition === 'sunny' ? "text-savannah" : 
                  currentWeather.condition === 'rainy' ? "text-tanzanite" : 
                  "text-foreground"
                )}
                animation={currentWeather.condition === 'sunny' ? "pulse" : "none"}
              />
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Condition</p>
              <p className="font-medium">{currentCondition?.name || "Unknown"}</p>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-medium">{currentWeather.temperature}°C</p>
            </div>
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Season</p>
              <p className="font-medium capitalize">{currentWeather.seasonType}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-full mt-1">
                <Droplets size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Wash Recommendation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentCondition?.washRecommendation || "Any wash type is suitable for today's weather."}
                </p>
                
                {currentCondition?.recommendedPackage && (
                  <div className="mt-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Recommended: {
                        currentCondition.recommendedPackage === 'basic' ? 'Basic Wash' :
                        currentCondition.recommendedPackage === 'premium' ? 'Premium Wash' :
                        currentCondition.recommendedPackage === 'deluxe' ? 'Deluxe Wash' :
                        currentCondition.recommendedPackage === 'mud-buster' ? 'Mud Buster' :
                        'Waterless Wash'
                      }
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <h4 className="font-medium mb-4 flex items-center">
                <Calendar size={16} className="mr-2" />
                Seasonal Packages
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-kilimanjaro/5 border border-kilimanjaro/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-kilimanjaro/20 rounded-full">
                      <CloudRain size={18} className="text-kilimanjaro" />
                    </div>
                    <h5 className="font-medium">Rainy Season Specials</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Special packages for March-May & October-December with focus on underbody cleaning and rust protection.
                  </p>
                  <Badge variant="outline" className="bg-kilimanjaro/10 text-kilimanjaro border-kilimanjaro/30">
                    Featured: Mud Buster Package
                  </Badge>
                </div>
                
                <div className="bg-safari/5 border border-safari/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-safari/20 rounded-full">
                      <Droplets size={18} className="text-safari" />
                    </div>
                    <h5 className="font-medium">Dry Season Specials</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Eco-friendly packages for June-September & January-February that save water while protecting your car from dust.
                  </p>
                  <Badge variant="outline" className="bg-safari/10 text-safari border-safari/30">
                    Featured: Waterless Wash
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalOffers;
