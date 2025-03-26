import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Droplets, 
  CreditCard,
  User,
  Phone,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { servicePackages, vehicleTypes, locations } from '@/utils/dummyData';

interface AppointmentFormProps {
  vehicleId: string;
  serviceId: string;
  totalPrice: number;
  onComplete: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  vehicleId,
  serviceId,
  totalPrice,
  onComplete
}) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>('09:00');
  const [location, setLocation] = useState<string>('dar-central');
  const [paymentMethod, setPaymentMethod] = useState<string>('m-pesa');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  
  // Validation functions
  const isFormValid = () => {
    return (
      !!date &&
      !!timeSlot &&
      !!location &&
      !!paymentMethod &&
      !!contactName &&
      !!contactPhone &&
      contactPhone.length === 10
    );
  };
  
  // Calculate total price with add-ons
  const calculateTotalWithAddons = () => {
    let addonsTotal = 0;
    if (additionalServices.includes('interior-disinfection')) addonsTotal += 15000;
    if (additionalServices.includes('engine-cleaning')) addonsTotal += 25000;
    if (additionalServices.includes('headlight-restoration')) addonsTotal += 20000;
    return totalPrice + addonsTotal;
  };
  
  // Toggle additional services
  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Your appointment has been booked!",
    });
    
    // Call the onComplete function to signal booking completion
    onComplete();
  };
  
  // Handle edit selections
  const handleEditSelections = () => {
    navigate('/booking');
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Book Your Appointment</CardTitle>
        <CardDescription>
          Fill in your details to schedule your car wash.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Vehicle and service summary */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Selected Package</h3>
            <Button variant="link" className="p-0 h-auto text-xs" onClick={handleEditSelections}>
              Edit Selections
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-primary/10 rounded-full">
                <Droplets size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {servicePackages.find(s => s.id === serviceId)?.name || 'Basic Wash'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {vehicleTypes.find(v => v.id === vehicleId)?.name || 'Sedan'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{totalPrice.toLocaleString()} TZS</p>
              <p className="text-xs text-muted-foreground">
                {`${Math.round(totalPrice / 100)} points`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Appointment form fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Contact Information</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Full Name</Label>
              <Input 
                type="text" 
                id="contact-name" 
                placeholder="John Doe" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input 
                type="tel" 
                id="contact-phone" 
                placeholder="07XXXXXXXX" 
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Time selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Select Date & Time</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Select 
              value={timeSlot} 
              onValueChange={setTimeSlot}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="13:00">01:00 PM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
                <SelectItem value="17:00">05:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Select 
              value={location} 
              onValueChange={setLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m-pesa">M-Pesa</SelectItem>
                <SelectItem value="tigo-pesa">Tigo Pesa</SelectItem>
                <SelectItem value="airtel-money">Airtel Money</SelectItem>
                <SelectItem value="cash">Cash on Site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Add-ons */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center justify-between">
            <span>Add-ons & Special Requests</span>
            {additionalServices.length > 0 && (
              <Badge variant="outline" className="ml-2 bg-primary/5 text-primary">
                {additionalServices.length} selected
              </Badge>
            )}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="interior-disinfection"
                className="rounded text-primary focus:ring-primary"
                checked={additionalServices.includes('interior-disinfection')}
                onChange={() => toggleAdditionalService('interior-disinfection')}
              />
              <label htmlFor="interior-disinfection" className="text-sm flex justify-between w-full">
                <span>Interior Disinfection</span>
                <span className="font-medium">15,000 TZS</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="engine-cleaning"
                className="rounded text-primary focus:ring-primary"
                checked={additionalServices.includes('engine-cleaning')}
                onChange={() => toggleAdditionalService('engine-cleaning')}
              />
              <label htmlFor="engine-cleaning" className="text-sm flex justify-between w-full">
                <span>Engine Bay Cleaning</span>
                <span className="font-medium">25,000 TZS</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="headlight-restoration"
                className="rounded text-primary focus:ring-primary"
                checked={additionalServices.includes('headlight-restoration')}
                onChange={() => toggleAdditionalService('headlight-restoration')}
              />
              <label htmlFor="headlight-restoration" className="text-sm flex justify-between w-full">
                <span>Headlight Restoration</span>
                <span className="font-medium">20,000 TZS</span>
              </label>
            </div>
          </div>
          
          <textarea
            placeholder="Any special requests or notes?"
            className="w-full p-2 border rounded-md text-sm"
            rows={2}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full flex justify-between text-base font-semibold">
          <span>Total Amount</span>
          <span>{calculateTotalWithAddons().toLocaleString()} TZS</span>
        </div>
        
        <Button 
          className="w-full"
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          Complete Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentForm;

// Define a Label component
function Label({ ...props }) {
  return (
    <FormLabel
      {...props}
    />
  )
}
