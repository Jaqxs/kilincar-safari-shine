
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Calendar,
  CreditCard,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedIcon from '@/components/common/AnimatedIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground overflow-hidden">
      {/* Wave effect */}
      <div className="relative h-12 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--secondary))"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,245.3C672,235,768,181,864,170.7C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <AnimatedIcon 
                icon={Car} 
                size={28} 
                className="text-primary mr-2" 
              />
              <h3 className="text-xl font-bold tracking-tight">KilinCar</h3>
            </div>
            <p className="text-secondary-foreground/80 max-w-xs">
              Tanzania's premier car washing service, bringing sparkle to your vehicles with eco-friendly solutions and unmatched quality.
            </p>
            <div className="flex space-x-4 pt-2">
              <AnimatedIcon 
                icon={Facebook} 
                size={20} 
                className="text-secondary-foreground/80 hover:text-primary cursor-pointer" 
              />
              <AnimatedIcon 
                icon={Instagram} 
                size={20} 
                className="text-secondary-foreground/80 hover:text-primary cursor-pointer" 
              />
              <AnimatedIcon 
                icon={Twitter} 
                size={20} 
                className="text-secondary-foreground/80 hover:text-primary cursor-pointer" 
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center">
              <Award size={16} className="mr-2" /> Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Book a Wash
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Loyalty Program
                </Link>
              </li>
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center">
              <Calendar size={16} className="mr-2" /> Features
            </h4>
            <ul className="space-y-2">
              <li className="text-secondary-foreground/80">
                Seasonal Packages
              </li>
              <li className="text-secondary-foreground/80">
                Mobile Wash Units
              </li>
              <li className="text-secondary-foreground/80">
                Waterless Washing
              </li>
              <li className="text-secondary-foreground/80">
                Loyalty Rewards
              </li>
              <li className="text-secondary-foreground/80">
                Luxury Detailing
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center">
              <Phone size={16} className="mr-2" /> Contact Us
            </h4>
            <div className="space-y-3">
              <p className="flex items-start text-secondary-foreground/80">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>Msasani Peninsula, Dar es Salaam, Tanzania</span>
              </p>
              <p className="flex items-center text-secondary-foreground/80">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+255 123 456 789</span>
              </p>
              <p className="flex items-center text-secondary-foreground/80">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>info@kilincar.co.tz</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-foreground/70 text-sm">
              &copy; {new Date().getFullYear()} KilinCar. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-secondary-foreground/70">Payment Options:</span>
              <div className="flex space-x-2">
                <AnimatedIcon 
                  icon={CreditCard} 
                  size={16} 
                  className="text-secondary-foreground/80" 
                />
                <span className="text-xs text-secondary-foreground/70">M-Pesa</span>
              </div>
              <div className="flex space-x-2">
                <AnimatedIcon 
                  icon={CreditCard} 
                  size={16} 
                  className="text-secondary-foreground/80" 
                />
                <span className="text-xs text-secondary-foreground/70">Tigo Pesa</span>
              </div>
              <div className="flex space-x-2">
                <AnimatedIcon 
                  icon={CreditCard} 
                  size={16} 
                  className="text-secondary-foreground/80" 
                />
                <span className="text-xs text-secondary-foreground/70">Airtel Money</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
