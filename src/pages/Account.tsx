
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth.tsx";
import { bookingService, BookingConfirmation } from "@/services/booking-service";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Car, CreditCard, LogOut, User, Award, Repeat, Clock, Gift, Star, BadgePercent, Droplets } from "lucide-react";
import { animateNumber } from "@/utils/animationUtils";
import { rewardsItems, dummyUser } from "@/utils/dummyData";
import AnimatedIcon from "@/components/common/AnimatedIcon";
import { useState } from "react";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Animate points counter
    animateNumber(0, dummyUser.points, 2000, setPoints);
  }, []);

  const userBookings: BookingConfirmation[] = user 
    ? bookingService.getUserBookings(user.userId)
    : [];

  if (!isAuthenticated || !user) {
    return null;
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
            className="max-w-5xl mx-auto"
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="rewards">My Rewards</TabsTrigger>
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
                                  {format(new Date(booking.bookingDetails.date), "PPP")} at {booking.bookingDetails.timeSlot}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Car className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Service</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.bookingDetails.serviceId || "Standard"} - {booking.bookingDetails.vehicleId || "Vehicle"}
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
              
              <TabsContent value="rewards" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Points Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="overflow-hidden bg-gradient-to-br from-primary/90 to-savannah border-0 shadow-xl text-primary-foreground rounded-2xl relative h-full">
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-shine-effect bg-[length:200%_100%] animate-shine opacity-20"></div>
                      
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="bg-white/10 border-white/20 text-white backdrop-blur-sm mb-6">
                              Kilin Rewards
                            </Badge>
                            <h3 className="text-2xl font-bold mb-1">Points Balance</h3>
                            <p className="text-white/70">
                              {user.name}
                            </p>
                          </div>
                          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                            <Award size={24} className="text-white" />
                          </div>
                        </div>
                        
                        <div className="mt-6 text-5xl font-semibold tracking-tight flex items-baseline">
                          {points}
                          <span className="text-lg ml-2 text-white/70">points</span>
                        </div>
                        
                        <div className="mt-8 space-y-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Award size={16} className="text-white/70" />
                            <span>Member since {dummyUser.memberSince}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Repeat size={16} className="text-white/70" />
                            <span>Next reward at 500 points</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock size={16} className="text-white/70" />
                            <span>Points valid for 12 months</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  {/* How it works */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="mr-2 h-5 w-5 text-primary" />
                        How It Works
                      </CardTitle>
                      <CardDescription>
                        Earn and redeem points with every wash
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          icon: Droplets,
                          title: "Get Your Car Washed",
                          description: "Earn points with every wash service at any of our locations."
                        },
                        {
                          icon: Star,
                          title: "Collect Kilin Points",
                          description: "Earn 1 point for every 100 TZS spent. Premium services earn bonus points."
                        },
                        {
                          icon: Gift,
                          title: "Redeem for Rewards",
                          description: "Use your points for free services, discounts, or exclusive products."
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`p-2 rounded-full bg-primary/10`}>
                            <item.icon size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
                
                {/* Available Rewards */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Gift size={24} className="mr-2 text-primary" />
                    Available Rewards
                  </h3>
                  
                  <div className="grid gap-6 md:grid-cols-3">
                    {rewardsItems.slice(0, 3).map((item) => (
                      <Card key={item.id} className="border transition-all duration-300 hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className={`
                              p-3 rounded-full 
                              ${item.category === 'service' ? 'bg-tanzanite/10' : 
                                item.category === 'discount' ? 'bg-clay/10' : 'bg-safari/10'}
                            `}>
                              {item.category === 'service' ? (
                                <AnimatedIcon icon={Droplets} size={20} className="text-tanzanite" />
                              ) : item.category === 'discount' ? (
                                <AnimatedIcon icon={BadgePercent} size={20} className="text-clay" />
                              ) : (
                                <AnimatedIcon icon={Gift} size={20} className="text-safari" />
                              )}
                            </div>
                            <Badge variant="outline" className="font-semibold">
                              {item.points} points
                            </Badge>
                          </div>
                          
                          <h4 className="font-semibold mb-2">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-6 rounded-full"
                            disabled={points < item.points}
                          >
                            {points >= item.points ? (
                              <>Redeem Now</>
                            ) : (
                              <>Need {item.points - points} more points</>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All Rewards
                    </Button>
                  </div>
                </div>
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
