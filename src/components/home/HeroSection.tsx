
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Droplets, Calendar, Trophy, ShieldCheck } from 'lucide-react';
import AnimatedIcon from '@/components/common/AnimatedIcon';
import { createBubbles } from '@/utils/animationUtils';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [bubbles, setBubbles] = useState<Array<{ id: string; style: React.CSSProperties }>>([]);
  
  useEffect(() => {
    setBubbles(createBubbles(15));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-savannah-light via-white to-safari-light">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble absolute"
            style={bubble.style}
          />
        ))}
        
        {/* Car silhouette */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl opacity-10">
          <svg viewBox="0 0 640 512" fill="currentColor" className="w-full h-auto text-kilimanjaro">
            <path d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-primary mb-4 inline-block">Tanzania's Premier Car Wash</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-4">
                Bring <span className="text-primary relative shine-hover">Sparkle</span> to Your 
                <span className="relative ml-3 text-tanzanite-dark inline-block">
                  Vehicle
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-tanzanite-dark rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                  />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:pr-10">
                Experience Tanzania's finest eco-friendly car washing services, tailored to local needs and vehicle types.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                asChild
                className="rounded-full shadow-lg bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300"
              >
                <Link to="/booking">
                  Book Now
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="rounded-full border-2 shadow-sm hover:bg-muted transition-colors"
              >
                <Link to="/services">
                  View Services
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6"
            >
              <div className="flex flex-col items-center text-center">
                <AnimatedIcon 
                  icon={Droplets} 
                  size={isMobile ? 20 : 24} 
                  className="text-tanzanite mb-2"
                />
                <span className="text-sm font-medium">Eco-friendly</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <AnimatedIcon 
                  icon={Calendar} 
                  size={isMobile ? 20 : 24} 
                  className="text-tanzanite mb-2"
                />
                <span className="text-sm font-medium">Easy Booking</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <AnimatedIcon 
                  icon={Trophy} 
                  size={isMobile ? 20 : 24} 
                  className="text-tanzanite mb-2"
                />
                <span className="text-sm font-medium">Rewards</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <AnimatedIcon 
                  icon={ShieldCheck} 
                  size={isMobile ? 20 : 24} 
                  className="text-tanzanite mb-2"
                />
                <span className="text-sm font-medium">Professional</span>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-20"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 water-effect"></div>
                <img 
                  src="https://images.unsplash.com/photo-1561129623-0d14ad8c5d67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                  alt="Car being washed in Tanzania" 
                  className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500 object-cover"
                />

                {/* Moving car animation */}
                <motion.div 
                  className="absolute bottom-6 w-20 h-8"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ 
                    x: ["calc(-100%)", "calc(100%)"],
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    times: [0, 0.1, 0.9, 1]
                  }}
                >
                  <svg viewBox="0 0 640 512" className="w-full h-full fill-current text-white">
                    <path d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"></path>
                  </svg>
                </motion.div>
              </div>

              {/* Floating status card */}
              <Card className="absolute -bottom-12 -left-8 md:-left-16 p-4 w-64 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border-0 animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-safari-light rounded-full">
                    <Droplets size={20} className="text-safari-dark" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Eco-friendly</h4>
                    <p className="text-xs text-muted-foreground mt-1">Our waterless wash saves up to 150L of water per vehicle</p>
                  </div>
                </motion.div>
              </Card>

              {/* Second floating card */}
              <Card className="absolute -top-8 -right-4 md:-right-12 p-4 w-60 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg border-0 animate-fade-in">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-savannah-light rounded-full">
                    <Calendar size={20} className="text-savannah-dark" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Easy Booking</h4>
                    <p className="text-xs text-muted-foreground mt-1">Schedule your wash at any of our 5 locations</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
