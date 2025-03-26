
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Droplets, 
  CreditCard,
  User,
  Phone,
  Mail,
  Check,
  Sparkles
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Step } from '@/components/ui/step';
import { paymentMethods, locations, timeSlots, luxuryAddOns } from '@/utils/dummyData';
import { toast } from '@/components/ui/use-toast';
import AnimatedIcon from '@/components/common/AnimatedIcon';

interface AppointmentFormProps {
  vehicleId: string;
  serviceId: string;
  totalPrice: number;
  className?: string;
  onComplete?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  vehicleId,
  serviceId,
  totalPrice,
  className,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Only show luxury add-ons for luxury vehicles
  const showAddOns = vehicleId === 'luxury';
  
  const goToNextStep = () => {
    if (currentStep === 1 && (!date || !time || !location)) {
      toast({
        title: "Missing information",
        description: "Please select date, time and location",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && (!name || !phone)) {
      toast({
        title: "Missing information",
        description: "Please provide your name and phone number",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 3 && !paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };
  
  const calculateTotalWithAddOns = () => {
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = luxuryAddOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    return totalPrice + addOnTotal;
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been scheduled.",
        variant: "default"
      });
      
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };
  
  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader>
        <CardTitle>Book Your Appointment</CardTitle>
        <CardDescription>
          Schedule your car wash service in a few simple steps
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <Step 
              key={step}
              status={
                currentStep === step 
                  ? "current" 
                  : currentStep > step 
                    ? "complete" 
                    : "incomplete"
              }
              onClick={() => currentStep > step && setCurrentStep(step)}
            >
              {step}
            </Step>
          ))}
        </div>
        
        {/* Step 1: Date, Time & Location */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <CalendarIcon size={18} className="mr-2 text-primary" />
              Select Date, Time & Location
            </h3>
            
            <div className="space-y-6">
              {/* Date picker */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        // Disable past dates and dates more than 30 days in the future
                        const futureLimit = new Date();
                        futureLimit.setDate(futureLimit.getDate() + 30);
                        return date < today || date > futureLimit;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Time selector */}
              <div className="space-y-2">
                <Label>Time</Label>
                <Select 
                  value={time} 
                  onValueChange={setTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={location}
                  onValueChange={setLocation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Display selected location details */}
              {location && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg p-4 bg-muted/30"
                >
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    Location Details
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    {/* Find and display location info */}
                    {(() => {
                      const selectedLocation = locations.find(loc => loc.id === location);
                      if (!selectedLocation) return null;
                      
                      return (
                        <>
                          <p>{selectedLocation.address}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              <Clock size={12} className="inline mr-1" />
                              {selectedLocation.openingHours}
                            </span>
                            <span>
                              <Phone size={12} className="inline mr-1" />
                              {selectedLocation.phone}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <User size={18} className="mr-2 text-primary" />
              Your Details
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+255 123 456 789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or instructions"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Payment Method & Add-ons */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <CreditCard size={18} className="mr-2 text-primary" />
              Payment & Add-ons
            </h3>
            
            <div className="space-y-6">
              {/* Payment methods */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      type="button"
                      variant={paymentMethod === method.id ? "default" : "outline"}
                      className={cn(
                        "h-auto py-3 px-4 flex flex-col items-center justify-center space-y-2",
                        paymentMethod === method.id && "border-primary"
                      )}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <AnimatedIcon 
                        icon={CreditCard} 
                        size={20} 
                        className={
                          paymentMethod === method.id 
                            ? "text-primary-foreground" 
                            : "text-foreground"
                        }
                      />
                      <span className="text-xs">{method.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Luxury add-ons (only for luxury vehicles) */}
              {showAddOns && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Luxury Add-ons</Label>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Premium Options
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {luxuryAddOns.map((addOn) => (
                      <div 
                        key={addOn.id}
                        className={cn(
                          "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                          selectedAddOns.includes(addOn.id) 
                            ? "border-primary bg-primary/5" 
                            : "hover:bg-muted/50"
                        )}
                        onClick={() => toggleAddOn(addOn.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "p-2 rounded-full mt-1",
                              selectedAddOns.includes(addOn.id) 
                                ? "bg-primary/20" 
                                : "bg-muted"
                            )}>
                              <AnimatedIcon 
                                icon={Sparkles} 
                                size={16} 
                                className={
                                  selectedAddOns.includes(addOn.id) 
                                    ? "text-primary" 
                                    : "text-muted-foreground"
                                }
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{addOn.name}</h4>
                              <p className="text-xs text-muted-foreground">{addOn.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold">{addOn.price.toLocaleString()} TZS</span>
                            <span className="text-xs text-muted-foreground">
                              +{addOn.duration} mins
                            </span>
                          </div>
                        </div>
                        
                        {selectedAddOns.includes(addOn.id) && (
                          <div className="mt-2 flex items-center text-xs text-primary">
                            <Check size={12} className="mr-1" /> Added to your service
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <Check size={18} className="mr-2 text-primary" />
              Confirm Your Booking
            </h3>
            
            <div className="space-y-6">
              <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Appointment Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon size={14} className="text-muted-foreground" />
                      <span>{date ? format(date, "PPP") : "Not selected"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>{time || "Not selected"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span>{locations.find(loc => loc.id === location)?.name || "Not selected"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car size={14} className="text-muted-foreground" />
                      <span>
                        {vehicleId === 'sedan' ? 'Sedan' : 
                         vehicleId === 'suv' ? 'SUV' : 
                         vehicleId === 'pickup' ? 'Pickup' : 
                         vehicleId === 'luxury' ? 'Luxury' : 'Motorcycle'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-muted-foreground" />
                      <span>{name || "Not provided"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span>{phone || "Not provided"}</span>
                    </div>
                    {email && (
                      <div className="flex items-center space-x-2">
                        <Mail size={14} className="text-muted-foreground" />
                        <span>{email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Service & Payment</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Service Package:</span>
                      <span className="font-medium">
                        {serviceId === 'basic' ? 'Basic Wash' : 
                         serviceId === 'premium' ? 'Premium Wash' : 
                         serviceId === 'deluxe' ? 'Deluxe Wash' : 
                         serviceId === 'mud-buster' ? 'Mud Buster' : 'Waterless Wash'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>{totalPrice.toLocaleString()} TZS</span>
                    </div>
                    
                    {selectedAddOns.length > 0 && (
                      <>
                        {selectedAddOns.map(addOnId => {
                          const addOn = luxuryAddOns.find(a => a.id === addOnId);
                          if (!addOn) return null;
                          
                          return (
                            <div key={addOnId} className="flex justify-between text-sm text-muted-foreground">
                              <span>+ {addOn.name}:</span>
                              <span>{addOn.price.toLocaleString()} TZS</span>
                            </div>
                          );
                        })}
                      </>
                    )}
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-bold">
                      <span>Total Price:</span>
                      <span>{calculateTotalWithAddOns().toLocaleString()} TZS</span>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span>Payment Method:</span>
                      <span className="text-primary font-medium">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name || "Not selected"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Special Instructions</h4>
                      <p className="text-sm text-muted-foreground">{notes}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>
                  By confirming this booking, you agree to KilinCar's terms and conditions. 
                  You will receive a confirmation message via SMS after booking.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {currentStep > 1 ? (
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={isSubmitting}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 4 ? (
          <Button onClick={goToNextStep}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            className="bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <AnimatedIcon 
                  icon={Sparkles} 
                  size={16} 
                  className="mr-2 animate-spin" 
                />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppointmentForm;
