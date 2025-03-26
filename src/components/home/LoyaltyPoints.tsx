
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Gift, 
  Clock, 
  Repeat, 
  Award, 
  ArrowRight,
  Star,
  BadgePercent
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { rewardsItems, dummyUser } from '@/utils/dummyData';
import { animateNumber } from '@/utils/animationUtils';
import AnimatedIcon from '@/components/common/AnimatedIcon';

const LoyaltyPoints: React.FC = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    animateNumber(0, dummyUser.points, 2000, setPoints);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-savannah-light/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary/10 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-tanzanite/10 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3">Kilin Loyalty</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Earn Points with Every Wash
          </h2>
          <p className="text-muted-foreground">
            Our loyalty program rewards you for keeping your vehicle clean. 
            Earn points with every service and redeem them for rewards and local goods.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Points Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-primary/90 to-savannah border-0 shadow-xl text-primary-foreground rounded-2xl relative">
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
                      {dummyUser.name}
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                    <Trophy size={24} className="text-white" />
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
                
                <div className="mt-8">
                  <Button 
                    asChild
                    variant="secondary" 
                    className="w-full bg-white text-primary hover:bg-white/90 rounded-full"
                  >
                    <Link to="/account">
                      View My Account
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Rewards */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Gift size={24} className="mr-2 text-primary" />
                  Redeem for Rewards
                </h3>
              </motion.div>
              
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {rewardsItems.map((item, index) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/2">
                      <motion.div 
                        variants={itemVariants}
                        className="h-full"
                      >
                        <Card className="border h-full transition-all duration-300 hover:shadow-md">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className={`
                                p-3 rounded-full 
                                ${item.category === 'service' ? 'bg-tanzanite/10' : 
                                  item.category === 'discount' ? 'bg-clay/10' : 'bg-safari/10'}
                              `}>
                                {item.category === 'service' ? (
                                  <AnimatedIcon icon={Car} size={20} className="text-tanzanite" />
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
                              disabled={dummyUser.points < item.points}
                            >
                              {dummyUser.points >= item.points ? (
                                <>Redeem Now</>
                              ) : (
                                <>Need {item.points - dummyUser.points} more points</>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-6 space-x-2">
                  <CarouselPrevious className="static relative transform-none" />
                  <CarouselNext className="static relative transform-none" />
                </div>
              </Carousel>
              
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <Link 
                  to="/account" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View All Rewards <ArrowRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* "How it works" section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-10 text-center">How It Works</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Get Your Car Washed",
                description: "Earn points with every wash service at any of our locations or with our mobile units."
              },
              {
                icon: Star,
                title: "Collect Kilin Points",
                description: "Earn 1 point for every 100 TZS spent. Premium and Deluxe services earn bonus points."
              },
              {
                icon: Gift,
                title: "Redeem for Rewards",
                description: "Use your points for free services, discounts, or exclusive Tanzanian artisan products."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <AnimatedIcon 
                    icon={item.icon} 
                    size={28} 
                    className="text-primary" 
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyPoints;
