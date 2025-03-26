
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepProps {
  children: React.ReactNode;
  status: 'incomplete' | 'current' | 'complete';
  onClick?: () => void;
  className?: string;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ children, status, onClick, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center space-y-2',
          status === 'complete' && 'cursor-pointer',
          className
        )}
        onClick={status === 'complete' ? onClick : undefined}
      >
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors',
            status === 'incomplete' && 'border-muted-foreground/30 text-muted-foreground',
            status === 'current' && 'border-primary bg-primary text-primary-foreground',
            status === 'complete' && 'border-primary bg-primary/10 text-primary'
          )}
        >
          {status === 'complete' ? <Check size={16} /> : children}
        </div>
        <div
          className={cn(
            'h-1 w-full max-w-[120px] bg-muted',
            status === 'current' && 'bg-primary',
            status === 'complete' && 'bg-primary'
          )}
        />
      </div>
    );
  }
);

Step.displayName = 'Step';
