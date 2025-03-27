
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { bookingService, BookingConfirmation } from "@/services/booking-service";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarClock, Car, CreditCard, LogOut, User } from "lucide-react";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Get user bookings if logged in
  const userBookings: BookingConfirmation[] = user 
    ? bookingService.getUserBookings(user.userId)
    : [];

  if (!isAuthenticated || !user) {
    return null; // Don't render anything until redirect happens
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" className="ml-auto" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
            
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
                {userBookings.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p className="text-muted-foreground">You don't have any bookings yet.</p>
                      <Button className="mt-4" onClick={() => navigate("/booking")}>
                        Make a Booking
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {userBookings.map((booking) => (
                      <Card key={booking.bookingId} className="overflow-hidden">
                        <CardHeader className="bg-primary/5 pb-4">
                          <CardTitle className="flex items-center justify-between">
                            <span>Booking #{booking.reference}</span>
                            <span className={`text-sm px-2 py-1 rounded ${
                              booking.paymentInfo.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.paymentInfo.status}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            {format(new Date(booking.timestamp), "PPP 'at' p")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <CalendarClock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Appointment</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(booking.bookingDetails.date), "PPP")} at {booking.bookingDetails.time}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Car className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Service</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.bookingDetails.vehicleType} - {booking.bookingDetails.washType}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Payment</p>
                                <p className="text-sm text-muted-foreground">
                                  ${booking.totalPrice.toFixed(2)} via {booking.paymentInfo.method}
                                </p>
                                {booking.paymentInfo.transactionId && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Transaction ID: {booking.paymentInfo.transactionId}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/20 pt-4">
                          <div className="flex justify-between w-full text-sm">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-semibold">${booking.totalPrice.toFixed(2)}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>
                      Manage your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
                        <polyline points="15,9 18,9 18,11" />
                        <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
                        <line x1="6" x2="7" y1="10" y2="10" />
                      </svg>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <div>
                        <p className="text-sm text-muted-foreground">Password</p>
                        <p className="font-medium">••••••••</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarClock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {format(new Date(user.lastLogin), "MMMM yyyy")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" disabled>
                      Edit Profile (Coming Soon)
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
