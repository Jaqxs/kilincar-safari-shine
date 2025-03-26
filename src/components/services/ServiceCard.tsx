
import React from 'react';
import { 
  Droplets, 
  Sparkles, 
  Star, 
  CloudRain,
  Cloud,
  Clock,
  Car
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import AnimatedIcon from '@/components/common/AnimatedIcon';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  duration: number;
  price: number;
  seasonal?: boolean;
  eco?: boolean;
  selected?: boolean;
  onSelect: () => void;
  index?: number;
}

const iconMap: Record<string, any> = {
  'droplets': Droplets,
  'sparkles': Sparkles,
  'star': Star,
  'cloud-rain': CloudRain,
  'cloud': Cloud
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  features,
  icon,
  color,
  duration,
  price,
  seasonal = false,
  eco = false,
  selected = false,
  onSelect,
  index = 0
}) => {
  // Make sure we have a valid icon, fallback to Droplets if not found
  const IconComponent = iconMap[icon] || Droplets;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card 
        className={cn(
          "h-full border-2 transition-all duration-300",
          seasonal && "border-kilimanjaro/30 bg-gradient-to-br from-transparent to-kilimanjaro/5",
          eco && "border-safari/30 bg-gradient-to-br from-transparent to-safari/5",
          selected && "border-primary shadow-lg"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className={cn(
              "p-3 rounded-xl",
              `bg-${color}/10`
            )}>
              <AnimatedIcon 
                icon={IconComponent} 
                size={24} 
                className={`text-${color}`} 
                animation={selected ? "pulse" : "none"}
              />
            </div>
            
            {seasonal && (
              <Badge variant="outline" className="border-kilimanjaro text-kilimanjaro bg-kilimanjaro/5">
                Seasonal
              </Badge>
            )}
            
            {eco && (
              <Badge variant="outline" className="border-safari text-safari bg-safari/5">
                Eco-Friendly
              </Badge>
            )}
          </div>
          
          <CardTitle className="text-xl mt-4 font-semibold">
            {name}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <div className="text-primary mt-1">✓</div>
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1.5" /> Duration
              </div>
              <div className="font-medium">
                {duration} min
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Car size={14} className="mr-1.5" /> Price
              </div>
              <div className="text-lg font-semibold">
                {price.toLocaleString()} TZS
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant={selected ? "default" : "outline"}
            className={cn(
              "w-full rounded-full mt-2",
              selected && "bg-primary text-primary-foreground"
            )}
            onClick={onSelect}
          >
            {selected ? "Selected" : "Select Package"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
