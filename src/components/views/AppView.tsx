import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, ChevronRight } from 'lucide-react';
import { Card, Button, TOKENS, cn } from '../../lib/design-system';

export const AppView = () => {
  const [density, setDensity] = useState<'overview' | 'telemetry'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['CPU', 'MEM']);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };
  
  return (
    <div className={cn(
      "space-y-8 p-4 md:p-8 rounded-[32px] md:rounded-[48px] border relative",
      TOKENS.effects.glassRefractive
    )}>
      {/* Background Atmosphere */}
      <div className={cn("absolute top-0 left-0 w-full h-full pointer-events-none opacity-20")}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
        <div className="flex gap-3">
          {['CPU', 'MEM', 'NET', 'DISK'].map(filter => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-2xl text-[10px] font-bold transition-all border backdrop-blur-xl",
                activeFilters.includes(filter) 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              )}
            >
              {filter}
            </motion.button>
          ))}
        </div>
        
        <div className="bg-white/5 p-1.5 rounded-2xl flex gap-1 border border-white/10 backdrop-blur-xl">
          {(['overview', 'telemetry'] as const).map(mode => (
            <button 
              key={mode}
              onClick={() => setDensity(mode)}
              className={`px-5 py-2 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${
                density === mode 
                  ? 'bg-white text-black shadow-xl' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div 
        className={`grid grid-cols-1 lg:grid-cols-12 ${density === 'overview' ? 'gap-8' : 'gap-3'}`}
      >
        {/* Main Telemetry Panel */}
        <div className="lg:col-span-8">
          <Card mode="app" className={cn(
            "relative",
            TOKENS.effects.glassRefractive,
            density === 'telemetry' ? TOKENS.density.telemetry.padding : TOKENS.density.overview.padding
          )}>
            <div className={TOKENS.effects.shimmer} />
            <AnimatePresence>
              {isRefreshing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md z-20 flex items-center justify-center"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn(
              "flex justify-between items-center",
              density === 'overview' ? "mb-10" : "mb-4"
            )}>
              <div className="space-y-1">
                <h2 className={cn(
                  density === 'overview' ? "text-3xl" : "text-lg",
                  "font-bold text-white tracking-tighter"
                )}>Neural Telemetry</h2>
                <p className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>Real-time Node Propagation</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Global Load</p>
                  <p className={cn(TOKENS.typography.mono, "text-xl font-bold text-white")}>42.8%</p>
                </div>
              </div>
            </div>

            <div className={cn(
              density === 'overview' ? "h-64" : "h-32",
              "bg-white/[0.02] rounded-3xl border border-white/5 flex items-end",
              density === 'overview' ? TOKENS.density.overview.padding + " " + TOKENS.density.overview.gap : TOKENS.density.telemetry.padding + " " + TOKENS.density.telemetry.gap
            )}>
              {[40, 70, 45, 90, 65, 80, 95, 30, 55, 85, 40, 60, 75, 90, 20, 50, 80, 45, 65, 85, 95, 70, 50].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: isRefreshing ? '20%' : `${h}%` }}
                  transition={{ delay: i * 0.02, type: "spring", stiffness: 100 }}
                  className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-400 rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                />
              ))}
            </div>
          </Card>
        </div>
        
        {/* Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card mode="app" className={cn(
            TOKENS.atmospheric.glass.blur,
            TOKENS.colors.app.surface,
            "border",
            TOKENS.colors.app.border,
            density === 'telemetry' ? TOKENS.density.telemetry.padding : TOKENS.density.overview.padding
          )}>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl">
                <Users size={28} />
              </div>
              <div>
                <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Active Nodes</p>
                <p className="text-4xl font-bold text-white tracking-tighter">1,284</p>
              </div>
            </div>
          </Card>

          <Card mode="app" className={cn(
            TOKENS.atmospheric.glass.blur,
            TOKENS.colors.app.surface,
            "border",
            TOKENS.colors.app.border,
            density === 'telemetry' ? TOKENS.density.telemetry.padding : TOKENS.density.overview.padding
          )}>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-xl">
                <TrendingUp size={28} />
              </div>
              <div>
                <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Throughput</p>
                <p className="text-4xl font-bold text-white tracking-tighter">4.8 <span className="text-sm text-amber-400/60">GB/s</span></p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRefresh}
              className="py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[28px] text-white font-bold text-[10px] uppercase tracking-[0.2em] transition-all"
            >
              Refresh
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 99, 235, 1)' }}
              whileTap={{ scale: 0.98 }}
              className="py-5 bg-blue-600 text-white rounded-[28px] font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              Initialize <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
