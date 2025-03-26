
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"; 
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

interface FormValues {
  contactName: string;
  contactPhone: string;
  date: Date;
  timeSlot: string;
  location: string;
  paymentMethod: string;
  specialRequests: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  vehicleId,
  serviceId,
  totalPrice,
  onComplete
}) => {
  const navigate = useNavigate();
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  
  const form = useForm<FormValues>({
    defaultValues: {
      contactName: '',
      contactPhone: '',
      date: new Date(),
      timeSlot: '09:00',
      location: 'dar-central',
      paymentMethod: 'm-pesa',
      specialRequests: ''
    }
  });
  
  const { register, watch, setValue, handleSubmit, formState: { errors } } = form;
  const watchedDate = watch('date');
  const watchedLocation = watch('location');
  const watchedPaymentMethod = watch('paymentMethod');
  const watchedTimeSlot = watch('timeSlot');
  
  // Toggle additional services
  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
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
  
  // Validate phone number
  const isPhoneValid = (phone: string) => {
    return phone.length === 10 && /^[0-9]+$/.test(phone);
  };
  
  // Form submission handler
  const onSubmit = (data: FormValues) => {
    if (!isPhoneValid(data.contactPhone)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number (10 digits).",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Your appointment has been booked!",
    });
    
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Full Name</Label>
                <Input 
                  id="contactName" 
                  placeholder="John Doe" 
                  {...register('contactName', { required: true })}
                  className={errors.contactName ? "border-destructive" : ""}
                />
                {errors.contactName && (
                  <p className="text-xs text-destructive mt-1">Name is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input 
                  id="contactPhone" 
                  placeholder="07XXXXXXXX" 
                  {...register('contactPhone', { 
                    required: true,
                    validate: isPhoneValid 
                  })}
                  className={errors.contactPhone ? "border-destructive" : ""}
                />
                {errors.contactPhone && (
                  <p className="text-xs text-destructive mt-1">Valid phone number required</p>
                )}
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
                        !watchedDate && "text-muted-foreground"
                      )}
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedDate ? format(watchedDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={watchedDate}
                      onSelect={(date) => setValue('date', date as Date)}
                      initialFocus
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Select 
                value={watchedTimeSlot} 
                onValueChange={(value) => setValue('timeSlot', value)}
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
                value={watchedLocation} 
                onValueChange={(value) => setValue('location', value)}
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
                value={watchedPaymentMethod} 
                onValueChange={(value) => setValue('paymentMethod', value)}
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
            
            <Textarea
              placeholder="Any special requests or notes?"
              className="w-full p-2 border rounded-md text-sm"
              rows={2}
              {...register('specialRequests')}
            />
          </div>
          
          <div className="w-full flex justify-between text-base font-semibold pt-4">
            <span>Total Amount</span>
            <span>{calculateTotalWithAddons().toLocaleString()} TZS</span>
          </div>
          
          <Button 
            className="w-full"
            type="submit"
          >
            Complete Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
