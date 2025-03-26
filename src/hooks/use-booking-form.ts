
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from '@/hooks/use-toast';
import { bookingService, BookingConfirmation } from '@/services/booking-service';

export interface BookingFormValues {
  contactName: string;
  contactPhone: string;
  date: Date;
  timeSlot: string;
  location: string;
  paymentMethod: string;
  specialRequests: string;
  additionalServices: string[];
  serviceId?: string; // Added for service selection
  vehicleId?: string; // Added for vehicle selection
}

export const useBookingForm = (onComplete: (confirmation: BookingConfirmation) => void, totalPrice: number) => {
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<BookingFormValues>({
    defaultValues: {
      contactName: '',
      contactPhone: '',
      date: new Date(),
      timeSlot: '09:00',
      location: 'dar-central',
      paymentMethod: 'm-pesa',
      specialRequests: '',
      additionalServices: []
    }
  });
  
  // Toggle additional services
  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
    
    const updatedServices = form.getValues().additionalServices || [];
    if (updatedServices.includes(serviceId)) {
      form.setValue('additionalServices', updatedServices.filter(id => id !== serviceId));
    } else {
      form.setValue('additionalServices', [...updatedServices, serviceId]);
    }
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
  const onSubmit = async (data: BookingFormValues) => {
    if (!isPhoneValid(data.contactPhone)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number (10 digits).",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Submit booking to our service
      const confirmation = await bookingService.submitBooking(
        data, 
        calculateTotalWithAddons()
      );
      
      toast({
        title: "Success",
        description: "Your appointment has been booked!",
      });
      
      // Pass the confirmation back to the component
      onComplete(confirmation);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book your appointment. Please try again.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    additionalServices,
    toggleAdditionalService,
    calculateTotalWithAddons,
    onSubmit,
    isPhoneValid,
    isSubmitting
  };
};
