
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Truck, 
  Bike 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { vehicleTypes } from '@/utils/dummyData';
import AnimatedIcon from '@/components/common/AnimatedIcon';

interface VehicleSelectorProps {
  selectedVehicleId: string;
  onChange: (vehicleId: string) => void;
  className?: string;
}

const iconMap: Record<string, any> = {
  'car': Car,
  'truck': Truck,
  'bike': Bike
};

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicleId,
  onChange,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Select Your Vehicle Type</h3>
        <p className="text-muted-foreground text-sm">
          Prices and options are tailored to your vehicle
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {vehicleTypes.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Button
              variant={selectedVehicleId === vehicle.id ? "default" : "outline"}
              className={cn(
                "w-full h-auto flex flex-col items-center py-4 px-2 gap-2 transition-all duration-300",
                selectedVehicleId === vehicle.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background hover:bg-muted/50",
                "border-2",
                selectedVehicleId === vehicle.id && "shadow-lg"
              )}
              onClick={() => onChange(vehicle.id)}
            >
              <AnimatedIcon 
                icon={iconMap[vehicle.icon] || Car} 
                size={24} 
                className={selectedVehicleId === vehicle.id ? "text-primary-foreground" : "text-foreground"}
              />
              <span className="text-sm font-medium text-center">{vehicle.name}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Vehicle info */}
      {selectedVehicleId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-4 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries({
              'Base Price': `${vehicleTypes.find(v => v.id === selectedVehicleId)?.basePrice.toLocaleString()} TZS`,
              'Wash Time': `${selectedVehicleId === 'luxury' ? '45-90' : '30-60'} minutes`,
              'Special Focus': selectedVehicleId === 'luxury' ? 'Premium detailing' : 
                              selectedVehicleId === 'suv' ? 'Underbody wash' : 
                              selectedVehicleId === 'pickup' ? 'Bed cleaning' : 
                              selectedVehicleId === 'motorcycle' ? 'Chain lubrication' : 'Interior comfort'
            }).map(([key, value]) => (
              <div key={key} className="bg-muted/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">{key}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VehicleSelector;
