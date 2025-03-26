
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  User, 
  Car, 
  Clock, 
  MapPin, 
  CreditCard,
  Share2,
  BadgePercent,
  Gift,
  Bell,
  Settings
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dummyUser, rewardsItems } from '@/utils/dummyData';
import AnimatedIcon from '@/components/common/AnimatedIcon';

const Account: React.FC = () => {
  // Points progress calculation
  const nextRewardPoints = 500;
  const pointsProgress = Math.min(100, (dummyUser.points / nextRewardPoints) * 100);
  const pointsToNextReward = Math.max(0, nextRewardPoints - dummyUser.points);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-12">
          {/* User profile header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {dummyUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-2xl font-bold">{dummyUser.name}</h1>
                  <p className="text-muted-foreground">Member since {dummyUser.memberSince}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Bell size={16} className="mr-1.5" /> Notifications
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Settings size={16} className="mr-1.5" /> Settings
                </Button>
              </div>
            </div>
          </div>
          
          {/* Loyalty card */}
          <Card className="mb-8 bg-gradient-to-r from-primary to-savannah overflow-hidden shadow-xl border-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-2/3 blur-3xl"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="text-white mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <Trophy size={20} className="mr-2" />
                    <h2 className="text-xl font-bold">Kilin Rewards</h2>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{dummyUser.points}</span>
                      <span className="ml-2 text-white/80">points</span>
                    </div>
                    
                    <div className="mt-2 mb-1 flex justify-between text-sm">
                      <span>Progress to next reward</span>
                      <span>{pointsToNextReward} points to go</span>
                    </div>
                    
                    <Progress value={pointsProgress} className="h-2 bg-white/20" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <Gift size={16} className="mr-1.5" /> Redeem Points
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <Share2 size={16} className="mr-1.5" /> Refer a Friend
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for account sections */}
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="history" className="flex items-center">
                <Clock size={16} className="mr-1.5" /> Wash History
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="flex items-center">
                <Car size={16} className="mr-1.5" /> My Vehicles
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center">
                <Gift size={16} className="mr-1.5" /> Rewards
              </TabsTrigger>
            </TabsList>
            
            {/* Wash History Tab */}
            <TabsContent value="history">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Wash History</h2>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Clock size={14} className="mr-1.5" /> Book Again
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {dummyUser.washHistory.length > 0 ? (
                    dummyUser.washHistory.map((wash, index) => (
                      <motion.div
                        key={wash.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <Card className="border shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="flex items-start space-x-4">
                                <div className="p-3 bg-muted rounded-full">
                                  <AnimatedIcon
                                    icon={Car}
                                    size={20}
                                    className="text-primary"
                                  />
                                </div>
                                
                                <div>
                                  <h3 className="font-medium text-lg">
                                    {wash.service === 'basic' ? 'Basic Wash' : 
                                     wash.service === 'premium' ? 'Premium Wash' : 
                                     wash.service === 'deluxe' ? 'Deluxe Wash' : 
                                     wash.service === 'mud-buster' ? 'Mud Buster' : 'Waterless Wash'}
                                  </h3>
                                  
                                  <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-3">
                                    <span className="flex items-center">
                                      <Clock size={14} className="mr-1" />
                                      {wash.date}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin size={14} className="mr-1" />
                                      {wash.location === 'dar-central' ? 'Dar Central' : 
                                       wash.location === 'dar-mbezi' ? 'Mbezi Beach' : 
                                       wash.location === 'arusha' ? 'Arusha' : 
                                       wash.location === 'mwanza' ? 'Mwanza' : 'Mobile Unit'}
                                    </span>
                                    <span className="flex items-center">
                                      <Car size={14} className="mr-1" />
                                      {dummyUser.vehicles.find(v => v.id === wash.vehicle)?.name || 'Unknown Vehicle'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 md:mt-0 md:text-right">
                                <p className="font-bold">{wash.price.toLocaleString()} TZS</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Points earned: {Math.round(wash.price / 100)}
                                </p>
                                <Button variant="outline" size="sm" className="mt-2 text-xs rounded-full">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <Card className="border shadow-sm text-center p-8">
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-muted rounded-full mb-4">
                          <Car size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Wash History</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't had any car washes with us yet.
                        </p>
                        <Button asChild className="rounded-full">
                          <Link to="/booking">Book Your First Wash</Link>
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Vehicles Tab */}
            <TabsContent value="vehicles">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Vehicles</h2>
                  <Button size="sm" className="rounded-full">
                    <Car size={14} className="mr-1.5" /> Add Vehicle
                  </Button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {dummyUser.vehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Card className="border shadow-sm">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                            <Badge variant="outline" className="bg-muted/50">
                              {vehicle.type === 'sedan' ? 'Sedan' : 
                              vehicle.type === 'suv' ? 'SUV' : 
                              vehicle.type === 'pickup' ? 'Pickup' : 
                              vehicle.type === 'luxury' ? 'Luxury' : 'Motorcycle'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground mb-4">
                            License Plate: <span className="font-medium text-foreground">{vehicle.licensePlate}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-xs rounded-full w-full">
                              Edit
                            </Button>
                            <Button variant="default" size="sm" className="text-xs rounded-full w-full" asChild>
                              <Link to={`/booking?vehicle=${vehicle.type}`}>
                                Book Wash
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {/* Add vehicle card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Card className="border border-dashed bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors h-full flex flex-col items-center justify-center py-8">
                      <div className="p-3 bg-muted rounded-full mb-4">
                        <Car size={24} className="text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">Add New Vehicle</h3>
                      <p className="text-sm text-muted-foreground">
                        Add another car to your profile
                      </p>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Available Rewards</h2>
                  <div className="flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-full">
                    <Trophy size={14} className="text-primary" />
                    <span className="font-medium">{dummyUser.points} points</span>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {rewardsItems.map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Card className="border h-full">
                        <CardContent className="p-4 pt-6 h-full flex flex-col">
                          <div className="flex-1">
                            <div className="p-2.5 rounded-full inline-block mb-3 bg-primary/10">
                              {reward.category === 'service' ? (
                                <Car size={18} className="text-primary" />
                              ) : reward.category === 'discount' ? (
                                <BadgePercent size={18} className="text-primary" />
                              ) : (
                                <Gift size={18} className="text-primary" />
                              )}
                            </div>
                            
                            <h3 className="font-medium mb-1">{reward.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {reward.description}
                            </p>
                          </div>
                          
                          <div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className="font-semibold">
                                {reward.points} points
                              </Badge>
                              <Button
                                variant={dummyUser.points >= reward.points ? "default" : "outline"}
                                size="sm"
                                className="rounded-full"
                                disabled={dummyUser.points < reward.points}
                              >
                                {dummyUser.points >= reward.points ? "Redeem" : "Not Enough Points"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <Card className="bg-muted/30 border-dashed border mt-8">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="p-3 bg-muted rounded-full">
                          <Share2 size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Refer a Friend</h3>
                          <p className="text-muted-foreground">
                            Earn 200 bonus points when a friend uses your referral code
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 items-center md:items-end">
                        <div className="bg-white px-4 py-2 border rounded-lg font-mono font-medium">
                          KILIN{dummyUser.name.substring(0, 4).toUpperCase()}
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                          Share Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
