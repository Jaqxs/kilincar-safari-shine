
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/ui/LanguageToggle';
import AnimatedIcon from '@/components/common/AnimatedIcon';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !transparent
          ? 'bg-background/80 backdrop-blur-md shadow-sm border-b'
          : 'bg-transparent',
        isOpen && 'bg-background border-b shadow-sm'
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary font-bold text-xl transition-transform duration-300 hover:scale-105"
        >
          <AnimatedIcon
            icon={Car}
            size={28}
            animation="none"
            className="text-primary"
          />
          <span className="tracking-tight">KilinCar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={cn(
            'hidden md:flex items-center space-x-8',
            transparent && !scrolled ? 'text-white' : 'text-foreground'
          )}
        >
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/booking" className="hover:text-primary transition-colors">
            Book Now
          </Link>
          <Link to="/account" className="hover:text-primary transition-colors">
            Loyalty
          </Link>
        </nav>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10"
          >
            <Bell size={20} />
          </Button>
          
          <Button
            asChild
            variant="default"
            size="sm"
            className="rounded-full hover:scale-105 transition-transform duration-300"
          >
            <Link to="/account">
              <User size={16} className="mr-1" /> Account
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container px-4 py-4 flex flex-col space-y-4 animate-fade-in">
            <Link
              to="/"
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/booking"
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
            <Link
              to="/account"
              className="py-2 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Loyalty
            </Link>
            
            <div className="flex items-center justify-between pt-2">
              <LanguageToggle />
              
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link to="/account" onClick={() => setIsOpen(false)}>
                  <User size={16} className="mr-1" /> My Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
