import React from 'react';
import { motion } from 'motion/react';
import { TOKENS, cn, Card, Button } from './lib/design-system';

const FitnessTracker = () => {
  const stats = [
    { label: 'Heart Rate', value: '72', unit: 'BPM', trend: '+2%' },
    { label: 'Steps', value: '8,432', unit: 'STEPS', trend: '84%' },
    { label: 'Active Min', value: '45', unit: 'MIN', trend: '+12m' },
    { label: 'Calories', value: '1,240', unit: 'KCAL', trend: '-5%' },
  ];

  const styles = TOKENS.colors.technical;

  return (
    <div className={cn(styles.bg, 'p-4 md:p-8 font-sans')}>
      {/* Header */}
      <header className={cn("mb-8 md:mb-16 border-b pb-8 relative", styles.border)}>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:20px_20px]" />
        <motion.h1 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn("font-display text-6xl sm:text-8xl md:text-9xl uppercase leading-[0.85] tracking-tighter break-words", styles.text)}
        >
          Performance<br />Telemetry
        </motion.h1>
        <p className={cn("mt-4 font-mono text-xs uppercase tracking-widest", styles.muted)}>
          Session ID: 0x4F2A9B // User: dmmotec
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card mode="technical" className={cn("group relative overflow-hidden transition-all p-6 md:p-8", "hover:bg-[#141414] hover:text-white")}>
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                <span className="font-mono text-4xl font-bold tracking-tighter">{i + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl md:text-6xl tracking-tighter">{stat.value}</span>
                  <span className="font-mono text-xs opacity-40">{stat.unit}</span>
                </div>
                <div className={cn("mt-6 flex items-center justify-between border-t pt-4 group-hover:border-white/20", "border-[#141414]/10")}>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-40 group-hover:opacity-60">Trend Analysis</span>
                    <span className="font-mono text-xs font-bold">{stat.trend}</span>
                  </div>
                  <div className="h-1.5 w-16 bg-[#141414]/5 group-hover:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      className="h-full bg-[#F27D26]" 
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card mode="technical" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl uppercase">Activity Timeline</h2>
            <Button mode="technical" variant="secondary" className="text-[10px] uppercase tracking-widest">
              Export CSV
            </Button>
          </div>
          <div className={cn("h-64 w-full border border-dashed flex items-center justify-center font-mono text-xs", "border-[#141414]/20 text-[#141414]/30")}>
            [Telemetry Data Visualization Placeholder]
          </div>
        </Card>

        <Card mode="technical" className="bg-[#F27D26] text-[#141414]">
          <h2 className="font-display text-2xl uppercase mb-4">Daily Goal</h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase">Progress</span>
              <span className="font-display text-4xl">84%</span>
            </div>
            <div className="h-2 w-full bg-[#141414]/10">
              <div className="h-full bg-[#141414]" style={{ width: '84%' }} />
            </div>
            <p className="font-mono text-[10px] leading-relaxed">
              You are 1,568 steps away from your daily target. Keep moving to maintain your streak.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FitnessTracker;
