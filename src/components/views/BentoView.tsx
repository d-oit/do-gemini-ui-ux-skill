import React from 'react';
import { motion } from 'motion/react';
import { Activity, Users, Settings } from 'lucide-react';
import { Card, TOKENS, cn } from '../../lib/design-system';

export const BentoView = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto p-4" style={{ perspective: 1200 }}>
    {/* Hero Cell (2x2) - Refractive Performance */}
    <motion.div 
      whileHover={{ scale: 1.02, rotateY: -5, translateZ: 40 }}
      className="md:col-span-2 md:row-span-2 group"
    >
      <Card mode="app" className={cn(
        "flex flex-col justify-between text-white cursor-pointer relative p-10",
        TOKENS.colors.app.bg,
        TOKENS.colors.app.border,
        TOKENS.radius.app
      )}>
        {/* Animated Gradient Background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"
        />
        
        <div className="relative z-10 space-y-6">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center border",
              TOKENS.atmospheric.glass.blur,
              TOKENS.colors.app.surface,
              TOKENS.colors.app.border,
              TOKENS.atmospheric.shadow["2xl"]
            )}
          >
            <Activity size={32} className="text-blue-400" />
          </motion.div>
          <div className="space-y-2">
            <h3 className={cn(TOKENS.typography.heading, "text-2xl md:text-4xl")}>System <br /> Performance</h3>
            <p className={cn(TOKENS.typography.body, "text-slate-400 text-xs md:text-sm max-w-xs")}>Real-time neural synchronization and throughput analytics.</p>
          </div>
        </div>

        <div className="relative z-10 flex items-baseline gap-2 md:gap-3">
          <span className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">99.9</span>
          <div className="space-y-1">
            <p className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>Uptime</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 bg-blue-500/40 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>

    {/* Secondary Cells - Spatial Storage */}
    <motion.div 
      whileHover={{ scale: 1.03, translateZ: 30, rotateX: 5 }} 
      className="md:col-span-2 group"
    >
      <Card mode="app" className={cn(
        "flex items-center justify-between cursor-pointer p-8 border",
        TOKENS.atmospheric.glass.blur,
        TOKENS.colors.app.surface,
        TOKENS.colors.app.border
      )}>
        <div className="space-y-2">
          <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Storage Volume</p>
          <p className="text-4xl font-bold text-white tracking-tighter">1.2 <span className="text-blue-500">TB</span></p>
          <div className={cn(TOKENS.typography.microLabel, "flex items-center gap-2 text-emerald-400")}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Optimized
          </div>
        </div>
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="40" className="stroke-white/5 fill-none" strokeWidth="8" />
            <motion.circle 
              cx="48" cy="48" r="40" 
              className="stroke-blue-500 fill-none" 
              strokeWidth="8" 
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 * (1 - 0.85) }}
              transition={{ duration: 2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">85%</span>
          </div>
        </div>
      </Card>
    </motion.div>

    {/* Active Admins - Glass Morphism */}
    <motion.div 
      whileHover={{ scale: 1.05, translateZ: 50 }}
      className="group"
    >
      <Card mode="app" className={cn(
        "flex flex-col justify-center items-center text-center space-y-4 cursor-pointer p-6 border transition-colors relative",
        TOKENS.effects.glassRefractive,
        "hover:bg-white/[0.05]"
      )}>
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
          <Users className="text-blue-400" size={28} />
        </div>
        <div>
          <p className="text-3xl font-bold text-white tracking-tighter">24</p>
          <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Admins</p>
        </div>
        {/* Liquid Shimmer Effect */}
        <div className={TOKENS.effects.shimmer} />
      </Card>
    </motion.div>

    {/* System Config - Interactive Rail */}
    <motion.div 
      whileHover={{ scale: 1.05, translateZ: 50 }}
      className="group"
    >
      <Card mode="app" className={cn(
        "flex flex-col justify-center items-center text-center space-y-4 cursor-pointer p-6 border transition-colors",
        TOKENS.atmospheric.glass.blur,
        TOKENS.colors.app.surface,
        TOKENS.colors.app.border,
        "hover:bg-white/[0.05]"
      )}>
        <motion.div 
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-slate-500/10 flex items-center justify-center"
        >
          <Settings className="text-slate-400" size={28} />
        </motion.div>
        <div className="space-y-3">
          <p className={cn(TOKENS.typography.microLabel, "text-white")}>Config</p>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              whileHover={{ width: '100%' }}
              className="w-4 h-full bg-blue-500" 
            />
          </div>
        </div>
      </Card>
    </motion.div>
  </div>
);
