import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';
import React from 'react';

/**
 * Utility for merging Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DESIGN TOKENS (The Single Source of Truth - Stitch Alignment) ---
export const TOKENS = {
  colors: {
    app: {
      bg: 'bg-[#050505]',
      surface: 'bg-white/[0.03]',
      primary: 'bg-blue-600',
      text: 'text-white',
      muted: 'text-slate-400',
      border: 'border-white/[0.12]',
      accent: 'text-blue-400',
    },
    game: {
      bg: 'bg-zinc-950',
      surface: 'bg-zinc-900/90',
      primary: 'bg-emerald-400',
      text: 'text-zinc-100',
      muted: 'text-zinc-400',
      border: 'border-zinc-700',
      accent: 'text-emerald-400',
    },
    neural: {
      bg: 'bg-[#020617]',
      surface: 'bg-indigo-500/5',
      primary: 'bg-cyan-500',
      text: 'text-cyan-50',
      muted: 'text-indigo-300/60',
      border: 'border-indigo-500/20',
      accent: 'text-fuchsia-400',
      contrastText: 'text-white',
    },
    technical: {
      bg: 'bg-[#E4E3E0]',
      surface: 'bg-white',
      primary: 'bg-[#141414]',
      text: 'text-[#141414]',
      muted: 'text-[#141414]/50',
      border: 'border-[#141414]',
      accent: 'text-[#F27D26]',
    }
  },
  atmospheric: {
    glass: {
      blur: 'backdrop-blur-[64px]',
      noise: 'bg-white/[0.03]',
      rim: {
        light: 'border-white/[0.15]',
        dark: 'border-black/[0.1]',
      }
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    }
  },
  density: {
    overview: {
      gap: 'gap-6',
      padding: 'p-8',
    },
    telemetry: {
      gap: 'gap-1',
      padding: 'p-2',
      text: 'text-[10px]',
    }
  },
  effects: {
    glass: 'backdrop-blur-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl',
    glassRefractive: 'backdrop-blur-[80px] bg-white/[0.01] border border-white/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.5)]',
    shimmer: 'absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none',
    antiFlicker: 'will-change-transform transform-gpu backface-visibility-hidden',
    highContrast: 'text-shadow-[0_0_20px_rgba(255,255,255,0.3)]',
    haptic: {
      hover: { scale: 1.02, y: -2 },
      tap: { scale: 0.98, y: 1 },
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  },
  spacing: {
    base: 4,
    container: 'p-4 md:p-8',
    gap: 'gap-4 md:gap-6',
    relaxed: 'gap-6 md:gap-10',
    compact: 'gap-1 md:gap-2',
  },
  radius: {
    app: 'rounded-[32px]',
    game: 'rounded-sm',
    full: 'rounded-full',
  },
  typography: {
    microLabel: 'text-[10px] font-bold uppercase tracking-[0.3em]',
    heading: 'text-2xl sm:text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1]',
    body: 'text-sm md:text-base leading-relaxed',
    mono: 'font-mono tracking-tight',
  },
  layout: {
    container: 'w-full max-w-6xl mx-auto px-4 md:px-6',
    section: 'py-12 md:py-24',
    mobileNav: 'overflow-x-auto no-scrollbar flex-nowrap scroll-smooth',
    safeArea: 'pb-safe pt-safe',
    hudSafeZone: 'p-6 md:p-10',
  },
  motion: {
    spring: { type: "spring", stiffness: 300, damping: 30 },
    gentle: { type: "spring", stiffness: 100, damping: 20 },
    fluid: { type: "spring", stiffness: 200, damping: 20 },
    bounce: { type: "spring", stiffness: 400, damping: 10 },
  }
};

// --- BASE COMPONENTS ---

export type DesignMode = 'app' | 'game' | 'neural' | 'technical';

export interface ModeProps {
  mode: DesignMode;
}

export const Card = ({ mode, children, className = "" }: ModeProps & { children: React.ReactNode, className?: string }) => {
  const styles = TOKENS.colors[mode];
  const radius = mode === 'game' ? TOKENS.radius.game : TOKENS.radius.app;
  
  return (
    <div className={cn(
      styles.surface,
      radius,
      'border',
      styles.border,
      'p-4 shadow-sm',
      className
    )}>
      {children}
    </div>
  );
};

export const Button = ({ 
  mode, 
  children, 
  variant = 'primary', 
  onClick, 
  className = "" 
}: ModeProps & { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary', 
  onClick?: () => void, 
  className?: string 
}) => {
  const styles = TOKENS.colors[mode];
  const radius = mode === 'game' ? TOKENS.radius.game : TOKENS.radius.app;
  
  const baseClasses = `px-4 py-2 font-medium transition-all flex items-center gap-2 ${radius}`;
  const variantClasses = variant === 'primary' 
    ? `${styles.primary} text-white shadow-lg` 
    : `${styles.surface} ${styles.text} border ${styles.border}`;

  return (
    <motion.button 
      whileTap={{ scale: 0.98, y: 1 }}
      onClick={onClick}
      className={cn(baseClasses, variantClasses, className)}
    >
      {children}
    </motion.button>
  );
};
