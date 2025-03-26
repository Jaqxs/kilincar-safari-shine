
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        'rounded-full py-1 px-3 text-xs font-medium',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      {language === 'en' ? 'Swahili' : 'English'}
    </Button>
  );
};

export default LanguageToggle;
