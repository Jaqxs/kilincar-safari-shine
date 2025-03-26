
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
  animation?: 'pulse' | 'spin' | 'bounce' | 'shake' | 'none';
  strokeWidth?: number;
  onClick?: () => void;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = 24,
  color,
  className,
  animation = 'none',
  strokeWidth = 2,
  onClick
}) => {
  const [animationClass, setAnimationClass] = useState<string>('');
  
  useEffect(() => {
    switch (animation) {
      case 'pulse':
        setAnimationClass('animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]');
        break;
      case 'spin':
        setAnimationClass('animate-spin-slow');
        break;
      case 'bounce':
        setAnimationClass('animate-[bounce_1s_infinite]');
        break;
      case 'shake':
        setAnimationClass('shake');
        break;
      default:
        setAnimationClass('');
    }
  }, [animation]);

  return (
    <div 
      className={cn(
        'transition-all duration-300 inline-flex items-center justify-center',
        animationClass,
        className
      )}
      onClick={onClick}
    >
      <Icon 
        size={size} 
        color={color} 
        strokeWidth={strokeWidth} 
        className="transition-transform duration-300" 
      />
    </div>
  );
};

export default AnimatedIcon;
