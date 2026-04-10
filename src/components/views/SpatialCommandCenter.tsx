import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Activity, Settings, Zap, Shield, Cpu, Globe } from 'lucide-react';
import { TOKENS, cn } from '../../lib/design-system';

export const SpatialCommandCenter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative p-6 md:p-12 rounded-[40px] md:rounded-[60px] bg-[#020408] border border-white/5 overflow-hidden flex items-center justify-center",
        TOKENS.effects.glassRefractive,
        TOKENS.effects.antiFlicker
      )}
      style={{ perspective: 1500 }}
    >
      {/* VOLUMETRIC LIGHTING SYSTEM */}
      <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", TOKENS.effects.antiFlicker)}>
        <motion.div 
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-100, 100]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-100, 100]),
          }}
          className={cn("absolute inset-0 opacity-30", TOKENS.effects.antiFlicker)}
        >
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        </motion.div>

        {/* Dynamic Rim Light */}
        <motion.div 
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(circle 600px at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, rgba(59, 130, 246, 0.15), transparent 70%)`
            )
          }}
          className="absolute inset-0 opacity-40"
        />
      </div>

      {/* 3D SPATIAL GRID */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-stretch"
      >
        {/* Sidebar: System Vitals */}
        <div className="lg:col-span-3 space-y-6" style={{ transform: "translateZ(40px)" }}>
          <div className={cn(
            "p-8 rounded-[40px] space-y-10 relative overflow-hidden",
            TOKENS.effects.glassRefractive,
            "border"
          )}>
            <div className={TOKENS.effects.shimmer} />
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              )}>
                <Activity className="text-blue-400" size={24} />
              </div>
              <div className="space-y-0.5">
                <h3 className={cn("text-white font-bold tracking-tight")}>Core Status</h3>
                <p className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>Operational</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { label: 'Neural Load', val: 74, icon: <Cpu size={14} /> },
                { label: 'Global Sync', val: 92, icon: <Globe size={14} /> },
                { label: 'Security', val: 100, icon: <Shield size={14} /> }
              ].map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className={cn(TOKENS.typography.microLabel, "text-slate-500 flex items-center gap-2")}>
                      {item.icon} {item.label}
                    </div>
                    <span className={cn(TOKENS.typography.mono, "text-sm text-white")}>{item.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button 
            whileHover={TOKENS.effects.haptic.hover}
            whileTap={TOKENS.effects.haptic.tap}
            className={cn(
              "w-full py-5 text-white border rounded-[28px] font-bold transition-all flex items-center justify-center gap-3",
              TOKENS.colors.app.surface,
              "hover:bg-white/[0.08]",
              TOKENS.colors.app.border,
              TOKENS.atmospheric.glass.blur,
              TOKENS.atmospheric.shadow.xl
            )}
          >
            <Settings size={20} className="text-slate-400" /> System Config
          </motion.button>
        </div>

        {/* Main Viewport: Neural Visualization */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2" style={{ transform: "translateZ(80px)" }}>
            <div className={cn(
              "h-full p-10 rounded-[48px] flex flex-col justify-between overflow-hidden relative group",
              TOKENS.atmospheric.glass.blur,
              TOKENS.colors.app.surface,
              "border",
              TOKENS.colors.app.border,
              TOKENS.atmospheric.shadow["2xl"]
            )}>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="space-y-6 relative z-10">
                <div className={cn(
                  "inline-flex px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400",
                  TOKENS.typography.microLabel
                )}>
                  Neural Telemetry
                </div>
                <h4 className={cn("text-2xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white break-words")}>
                  Network <br /> Synchronization
                </h4>
                <p className={cn(TOKENS.typography.body, TOKENS.colors.app.muted, "max-w-sm")}>
                  Real-time visualization of distributed neural nodes and cross-region data propagation.
                </p>
              </div>

              <div className="h-48 flex items-end gap-2 relative z-10">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      height: [`${30 + Math.random() * 70}%`, `${30 + Math.random() * 70}%`],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-400/60 rounded-t-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-1 gap-6" style={{ transform: "translateZ(60px)" }}>
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.03, translateZ: 20, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={cn(
                  "p-8 rounded-[32px] flex items-center gap-6 group transition-colors",
                  TOKENS.atmospheric.glass.blur,
                  TOKENS.colors.app.surface,
                  "border",
                  TOKENS.colors.app.border,
                  TOKENS.atmospheric.shadow.xl
                )}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500/20 transition-colors border border-white/5">
                  <Zap className="text-blue-400" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white tracking-tighter">0{i}</p>
                  <p className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Node Alpha</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
