import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, Zap, Timer, Flame, TrendingUp, ChevronRight, Share2 } from 'lucide-react';
import { TOKENS, cn, Card, Button } from './lib/design-system';

const FitnessTracker = () => {
  const [heartRate, setHeartRate] = useState(72);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Heart Rate', value: heartRate.toString(), unit: 'BPM', trend: '+2%', icon: <Heart size={16} className="text-rose-500" /> },
    { label: 'Steps', value: '8,432', unit: 'STEPS', trend: '84%', icon: <Activity size={16} className="text-blue-500" /> },
    { label: 'Active Min', value: '45', unit: 'MIN', trend: '+12m', icon: <Timer size={16} className="text-emerald-500" /> },
    { label: 'Calories', value: '1,240', unit: 'KCAL', trend: '-5%', icon: <Flame size={16} className="text-orange-500" /> },
  ];

  const styles = TOKENS.colors.technical;

  return (
    <div className={cn(styles.bg, 'p-4 md:p-8 font-sans min-h-screen relative overflow-hidden', TOKENS.effects.antiFlicker)}>
      {/* SPATIAL GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Header */}
      <header className={cn("mb-12 md:mb-20 border-b pb-10 relative z-10", styles.border)}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#141414] flex items-center justify-center text-white shadow-xl">
                <Zap size={20} />
              </div>
              <span className={cn(TOKENS.typography.microLabel, "text-[#F27D26]")}>Live Telemetry</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn("font-display text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.8] tracking-tighter", styles.text)}
            >
              Performance<br />Telemetry
            </motion.h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className={cn("font-mono text-[10px] uppercase tracking-widest", styles.muted)}>
              Session: <span className="text-[#141414] font-bold">0x4F2A9B</span>
            </p>
            <p className={cn("font-mono text-[10px] uppercase tracking-widest", styles.muted)}>
              User: <span className="text-[#141414] font-bold">DMMOTEC.ATHLETE</span>
            </p>
            <div className="flex gap-2 mt-2">
              <Button mode="technical" variant="secondary" className="px-3 py-1.5 text-[8px]">
                <Share2 size={12} /> Share
              </Button>
              <Button mode="technical" className="px-3 py-1.5 text-[8px]">
                Live Sync
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card mode="technical" className={cn(
              "group relative overflow-hidden transition-all p-6 md:p-8 border-2",
              "hover:bg-[#141414] hover:text-white hover:border-[#F27D26]/30"
            )}>
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                {stat.icon}
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                      {stat.label}
                    </span>
                  </div>
                  <TrendingUp size={14} className="text-[#F27D26] opacity-40" />
                </div>

                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={stat.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-display text-6xl md:text-7xl tracking-tighter"
                    >
                      {stat.value}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-mono text-xs opacity-40 font-bold">{stat.unit}</span>
                </div>

                <div className={cn("mt-4 flex items-center justify-between border-t pt-4 group-hover:border-white/10", "border-[#141414]/10")}>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-40 group-hover:opacity-60">Trend Analysis</span>
                    <span className="font-mono text-xs font-bold">{stat.trend}</span>
                  </div>
                  <div className="h-1.5 w-20 bg-[#141414]/5 group-hover:bg-white/10 rounded-full overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '74%' }}
                      className="h-full bg-[#F27D26] rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 relative z-10">
        <Card mode="technical" className="lg:col-span-2 p-8 border-2">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="font-display text-3xl uppercase tracking-tighter">Activity Timeline</h2>
              <p className="font-mono text-[10px] text-[#141414]/40 uppercase tracking-widest">Real-time data stream // 24h window</p>
            </div>
            <div className="flex gap-2">
              <Button mode="technical" variant="secondary" className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                Day
              </Button>
              <Button mode="technical" variant="secondary" className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold opacity-40">
                Week
              </Button>
            </div>
          </div>
          
          <div className={cn(
            "h-80 w-full border-2 border-dashed rounded-[32px] flex items-center justify-center font-mono text-[10px] relative overflow-hidden",
            "border-[#141414]/10 text-[#141414]/30"
          )}>
            <div className="absolute inset-0 flex items-center justify-around px-10 opacity-20">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-1 bg-[#141414]" style={{ height: `${20 + Math.random() * 60}%` }} />
                  <span className="text-[8px]">{i}h</span>
                </div>
              ))}
            </div>
            <div className="relative z-10 bg-white/80 backdrop-blur-md px-4 py-2 border border-[#141414]/10 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-ping" />
              Live Visualization Active
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card mode="technical" className="bg-[#F27D26] text-[#141414] p-8 border-2 border-[#141414]/10">
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-display text-4xl uppercase leading-none tracking-tighter">Daily<br />Goal</h2>
              <div className="w-12 h-12 rounded-full border-2 border-[#141414]/20 flex items-center justify-center font-display text-xl">
                84
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Progress</span>
                <span className="font-mono text-xs font-bold">10,000 STEPS TARGET</span>
              </div>
              <div className="h-4 w-full bg-[#141414]/10 rounded-full p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  className="h-full bg-[#141414] rounded-full" 
                />
              </div>
              <p className="font-mono text-[11px] leading-relaxed font-medium">
                You are <span className="underline decoration-2 underline-offset-4 font-bold">1,568 steps</span> away from your daily target. Keep moving to maintain your streak.
              </p>
              <Button mode="technical" className="w-full bg-[#141414] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                View Insights <ChevronRight size={16} />
              </Button>
            </div>
          </Card>

          <Card mode="technical" className="p-8 border-2 border-[#141414]/5 bg-[#141414]/5">
            <h3 className="font-display text-xl uppercase mb-4 tracking-tight">Recovery Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-display text-[#F27D26]">92</div>
              <div className="font-mono text-[10px] uppercase tracking-widest leading-tight opacity-60">
                Optimal<br />Readiness
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
