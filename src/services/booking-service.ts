
import { BookingFormValues } from "@/hooks/use-booking-form";

// Simulate backend response time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a random booking reference
const generateBookingReference = () => {
  return `KLN${Math.floor(100000 + Math.random() * 900000)}`;
};

// Generate transaction IDs for payments
const generateTransactionId = () => {
  return `TXN${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
};

export interface BookingConfirmation {
  bookingId: string;
  reference: string;
  timestamp: string;
  bookingDetails: BookingFormValues;
  totalPrice: number;
  paymentInfo: {
    method: string;
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
  };
}

export const bookingService = {
  async submitBooking(bookingData: BookingFormValues, totalPrice: number): Promise<BookingConfirmation> {
    // Simulate API call
    await delay(1500);
    
    // Process payment based on method
    const paymentResult = await this.processPayment(bookingData.paymentMethod, totalPrice);
    
    // Generate a confirmation response
    const confirmation: BookingConfirmation = {
      bookingId: crypto.randomUUID(),
      reference: generateBookingReference(),
      timestamp: new Date().toISOString(),
      bookingDetails: bookingData,
      totalPrice,
      paymentInfo: paymentResult
    };
    
    // Store in local storage (our "database" for now)
    const existingBookings = this.getAllBookings();
    const updatedBookings = [...existingBookings, confirmation];
    localStorage.setItem('car_wash_bookings', JSON.stringify(updatedBookings));
    
    return confirmation;
  },
  
  async processPayment(paymentMethod: string, amount: number) {
    // Simulate payment processing
    await delay(800);
    
    // In a real app, we would integrate with actual payment APIs here
    // For now, we'll simulate a successful payment
    return {
      method: paymentMethod,
      status: 'completed' as const,
      transactionId: generateTransactionId()
    };
  },
  
  getAllBookings(): BookingConfirmation[] {
    const bookingsJson = localStorage.getItem('car_wash_bookings');
    if (!bookingsJson) return [];
    
    try {
      return JSON.parse(bookingsJson);
    } catch (error) {
      console.error('Error parsing bookings from local storage:', error);
      return [];
    }
  },
  
  getBookingByReference(reference: string): BookingConfirmation | undefined {
    const bookings = this.getAllBookings();
    return bookings.find(booking => booking.reference === reference);
  }
};
