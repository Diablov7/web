import * as React from 'react';
import { cn } from '../../lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = 'rgba(160, 32, 240, 0.1)',
      shimmerSize = '0.1em',
      shimmerDuration = '1.5s',
      borderRadius = '0.75rem', // Updated to rounded-xl equivalent
      background = 'linear-gradient(145deg, rgba(0, 209, 196, 0.2), rgba(160, 32, 240, 0.1))',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative flex items-center justify-center overflow-hidden whitespace-nowrap px-8 py-3 font-bold transition-all duration-300',
          'hover:scale-[1.02] active:scale-[0.98]',
          'rounded-xl', // Added explicit rounded corners
          className
        )}
        style={{
          background,
          border: '1px solid rgba(0, 209, 196, 0.2)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 209, 196, 0.1)',
        }}
        {...props}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl"
          style={{
            maskImage: `linear-gradient(${shimmerColor}, ${shimmerColor})`,
            maskSize: '200% 100%',
            animation: `shimmer ${shimmerDuration} linear infinite`,
          }}
        >
          <div
            className="h-[100%] w-[100%] animate-[shimmer_1.5s_linear_infinite]"
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                ${shimmerColor} 50%,
                transparent 100%
              )`,
              transform: 'translateX(-100%)',
            }}
          />
        </div>

        {/* Inner highlight */}
        <div
          className={cn(
            'absolute inset-[1px] rounded-xl',
            'bg-gradient-to-b from-white/10 to-transparent',
            'opacity-50 transition-opacity duration-300',
            'group-hover:opacity-70'
          )}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">{children}</div>

        {/* Hover glow */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl',
            'opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100',
            'bg-gradient-to-r from-[#00D1C4]/20 to-[#A020F0]/20'
          )}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';