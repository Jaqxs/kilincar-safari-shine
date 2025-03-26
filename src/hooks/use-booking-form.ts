
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from '@/hooks/use-toast';

export interface BookingFormValues {
  contactName: string;
  contactPhone: string;
  date: Date;
  timeSlot: string;
  location: string;
  paymentMethod: string;
  specialRequests: string;
  additionalServices: string[];
}

export const useBookingForm = (onComplete: () => void, totalPrice: number) => {
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  
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
  const onSubmit = (data: BookingFormValues) => {
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
  
  return {
    form,
    additionalServices,
    toggleAdditionalService,
    calculateTotalWithAddons,
    onSubmit,
    isPhoneValid
  };
};
