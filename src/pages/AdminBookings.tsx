
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, ClipboardList, Search, User, Phone, MapPin, Clock, CreditCard } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookingService, BookingConfirmation } from '@/services/booking-service';
import { locations, vehicleTypes, servicePackages } from '@/utils/dummyData';

const AdminBookings: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingConfirmation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load bookings on component mount
  useEffect(() => {
    const loadBookings = () => {
      const allBookings = bookingService.getAllBookings();
      setBookings(allBookings);
    };
    
    loadBookings();
    
    // Set up interval to refresh bookings every 10 seconds
    const interval = setInterval(loadBookings, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter bookings based on search query
  const filteredBookings = bookings.filter(booking => {
    if (!searchQuery.trim()) return true;
    
    const { bookingDetails, reference } = booking;
    const lowerQuery = searchQuery.toLowerCase();
    
    return (
      bookingDetails.contactName.toLowerCase().includes(lowerQuery) ||
      bookingDetails.contactPhone.includes(lowerQuery) ||
      reference.toLowerCase().includes(lowerQuery) ||
      locations.find(l => l.id === bookingDetails.location)?.name.toLowerCase().includes(lowerQuery)
    );
  });
  
  // Get service and vehicle display names
  const getServiceName = (serviceId: string) => 
    servicePackages.find(s => s.id === serviceId)?.name || 'Unknown Service';
    
  const getVehicleName = (vehicleId: string) => 
    vehicleTypes.find(v => v.id === vehicleId)?.name || 'Unknown Vehicle';
    
  const getLocationName = (locationId: string) => 
    locations.find(l => l.id === locationId)?.name || 'Unknown Location';
  
  // Format payment method for display
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'm-pesa': return 'M-Pesa';
      case 'tigo-pesa': return 'Tigo Pesa';
      case 'airtel-money': return 'Airtel Money';
      case 'cash': return 'Cash on Site';
      default: return method;
    }
  };
  
  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
              <p className="text-muted-foreground">View and manage all car wash appointments</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => navigate('/booking')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Booking Records</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery ? 'Try a different search term' : 'Book your first appointment to get started'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        const { bookingDetails, reference, timestamp, totalPrice, paymentInfo } = booking;
                        
                        return (
                          <TableRow key={booking.bookingId}>
                            <TableCell className="font-medium">
                              {reference}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{bookingDetails.contactName}</span>
                                <span className="text-xs text-muted-foreground">{bookingDetails.contactPhone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{format(new Date(bookingDetails.date), 'MMM d, yyyy')}</span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {bookingDetails.timeSlot.slice(0, 2)}:{bookingDetails.timeSlot.slice(2)} 
                                  {parseInt(bookingDetails.timeSlot) < 12 ? ' AM' : ' PM'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{getServiceName(bookingDetails.serviceId || 'basic')}</span>
                                <span className="text-xs text-muted-foreground">
                                  {getVehicleName(bookingDetails.vehicleId || 'sedan')}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{getLocationName(bookingDetails.location)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">{formatPaymentMethod(bookingDetails.paymentMethod)}</span>
                                  {getPaymentStatusBadge(paymentInfo?.status || 'pending')}
                                </div>
                                {paymentInfo?.transactionId && (
                                  <span className="text-xs text-muted-foreground mt-1">
                                    {paymentInfo.transactionId}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {totalPrice.toLocaleString()} TZS
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminBookings;
