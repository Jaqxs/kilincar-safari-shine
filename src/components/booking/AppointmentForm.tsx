
import React from 'react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { servicePackages, vehicleTypes, locations } from '@/utils/dummyData';
import { useBookingForm } from '@/hooks/use-booking-form';

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
  const { 
    form, 
    additionalServices, 
    toggleAdditionalService, 
    calculateTotalWithAddons, 
    onSubmit 
  } = useBookingForm(onComplete, totalPrice);
  
  const { control, watch, setValue, handleSubmit, formState: { errors } } = form;
  
  const watchedDate = watch('date');
  const watchedLocation = watch('location');
  const watchedPaymentMethod = watch('paymentMethod');
  const watchedTimeSlot = watch('timeSlot');
  
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="contactName"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="contactPhone"
                  rules={{ 
                    required: "Phone number is required", 
                    validate: (value) => (value.length === 10 && /^[0-9]+$/.test(value)) || "Please enter a valid phone number (10 digits)" 
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="07XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Time selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select Date & Time</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              type="button"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map(loc => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m-pesa">M-Pesa</SelectItem>
                          <SelectItem value="tigo-pesa">Tigo Pesa</SelectItem>
                          <SelectItem value="airtel-money">Airtel Money</SelectItem>
                          <SelectItem value="cash">Cash on Site</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              
              <FormField
                control={control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or notes?"
                        className="w-full p-2 border rounded-md text-sm"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
