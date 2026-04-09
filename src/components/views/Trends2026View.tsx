import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronRight } from 'lucide-react';
import { TOKENS, cn } from '../../lib/design-system';

export const Trends2026View = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const researchHighlights = [
    { title: "Spatial Intelligence", desc: "AI-driven volumetric layouts that adapt to user focus.", icon: "01" },
    { title: "Atmospheric Depth", desc: "Layered refraction simulating real-world light physics.", icon: "02" },
    { title: "Haptic Surfaces", desc: "Digital materials with simulated physical resistance.", icon: "03" }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative p-8 md:p-16 rounded-[60px] overflow-hidden min-h-[700px] flex items-center justify-center border selection:bg-blue-500/30",
        TOKENS.colors.app.bg,
        TOKENS.colors.app.border,
        TOKENS.effects.antiFlicker
      )}
    >
      {/* 2026 ATMOSPHERIC DEPTH SYSTEM */}
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", TOKENS.effects.antiFlicker)}>
        {/* Deep Field: Slow Parallax */}
        <motion.div 
          animate={{ 
            x: mousePos.x * -40,
            y: mousePos.y * -40,
          }}
          className={cn("absolute inset-[-10%] opacity-40", TOKENS.effects.antiFlicker)}
        >
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[180px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
        </motion.div>

        {/* Mid Field: Refractive Shimmer */}
        <motion.div 
          animate={{ 
            x: mousePos.x * -80,
            y: mousePos.y * -80,
            rotate: mousePos.x * 5
          }}
          className={cn("absolute inset-0 opacity-30", TOKENS.effects.antiFlicker)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent blur-[100px]" />
        </motion.div>

        {/* Foreground: Dynamic Rim Light & Chromatic Aberration */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle 800px at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(59, 130, 246, 0.12), transparent 70%)`,
          }}
        />

        {/* Digital Grain / Noise */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: RESEARCH DATA */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "inline-flex items-center gap-3 px-4 py-2 rounded-2xl border",
                TOKENS.atmospheric.glass.blur,
                TOKENS.colors.app.surface,
                TOKENS.colors.app.border
              )}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className={cn(TOKENS.typography.microLabel, "text-blue-400")}>Intelligence Report 2026</span>
            </motion.div>
            
            <motion.h3 
              className={cn(TOKENS.typography.heading, "text-5xl md:text-8xl text-white pb-4")}
              style={{ perspective: 1000 }}
            >
              <motion.span 
                animate={{ x: mousePos.x * 10, y: mousePos.y * 5 }}
                className="block py-2"
              >
                Spatial
              </motion.span>
              <motion.span 
                animate={{ x: mousePos.x * 20, y: mousePos.y * 10 }}
                className="block py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500"
              >
                Intelligence
              </motion.span>
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchHighlights.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "p-6 rounded-3xl border transition-colors group",
                  TOKENS.colors.app.surface,
                  TOKENS.colors.app.border,
                  "hover:bg-white/[0.04]"
                )}
              >
                <div className={cn(TOKENS.typography.mono, "text-[10px] text-blue-500/50 mb-4 group-hover:text-blue-400 transition-colors")}>[{item.icon}]</div>
                <h4 className="text-white font-bold mb-2 tracking-tight">{item.title}</h4>
                <p className={cn(TOKENS.typography.body, "text-slate-500 text-sm")}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: HAPTIC SURFACE PROTOTYPE */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div 
            ref={cardRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setIsPressed(false);
              setMousePos({ x: 0, y: 0 });
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{ perspective: 2000 }}
            whileHover={{ 
              rotateY: mousePos.x * 12,
              rotateX: -mousePos.y * 12,
              translateZ: 60,
            }}
            whileTap={{ 
              scale: 0.96,
              translateZ: -40,
              rotateX: -mousePos.y * 5,
              rotateY: mousePos.x * 5,
            }}
            transition={{ 
              type: "spring", 
              stiffness: isPressed ? 600 : 250, 
              damping: isPressed ? 40 : 25,
              mass: 1.8 // Simulated inertia
            }}
            className={cn(
              "relative w-full max-w-[420px] aspect-[4/5] p-12 rounded-[56px] border group cursor-none overflow-hidden",
              TOKENS.effects.glassRefractive,
              TOKENS.effects.antiFlicker
            )}
          >
            {/* HAPTIC VISCOSITY EFFECT (Custom Cursor) */}
            <motion.div 
              animate={{ 
                x: (mousePos.x + 0.5) * 420 - 100,
                y: (mousePos.y + 0.5) * 525 - 100,
                scale: isPressed ? 0.8 : isHovering ? 1.2 : 0,
                opacity: isHovering ? 1 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute pointer-events-none z-50 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl mix-blend-soft-light"
            />

            {/* RIM LIGHTING (CARD SPECIFIC) */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle 250px at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.07), transparent 80%)`,
              }}
            />

            {/* CONTENT LAYERS */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-12">
                <div className="flex justify-between items-start">
                  <motion.div 
                    animate={{ 
                      rotate: isHovering ? 15 : 0,
                      scale: isPressed ? 0.9 : 1
                    }}
                    className={cn(
                      "w-20 h-20 rounded-3xl border flex items-center justify-center shadow-2xl backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20",
                      TOKENS.colors.app.border
                    )}
                  >
                    <Zap className="text-blue-400" size={36} />
                  </motion.div>
                  <div className="text-right space-y-1">
                    <p className="text-white font-bold text-2xl tracking-tighter">HAPTIC</p>
                    <p className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>Surface v4.2</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className={cn(TOKENS.typography.microLabel, "text-slate-500")}>Resistance Load</span>
                      <span className={cn(TOKENS.typography.mono, "text-2xl text-white")}>{isPressed ? '98' : isHovering ? '42' : '00'}%</span>
                    </div>
                    <div className={cn(
                      "h-3 w-full rounded-full overflow-hidden p-1 border",
                      TOKENS.colors.app.surface,
                      TOKENS.colors.app.border
                    )}>
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: isPressed ? '98%' : isHovering ? '42%' : '5%' }}
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      />
                    </div>
                  </div>
                  
                  <p className={cn(TOKENS.typography.body, "text-slate-400 text-sm font-light")}>
                    This surface utilizes <span className="text-white font-medium">Kinetic Viscosity</span>. 
                    The digital material thickens as interaction pressure increases, providing tactile confirmation.
                  </p>
                </div>
              </div>

              <div className={cn("pt-8 border-t flex items-center justify-between", TOKENS.colors.app.border)}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className={cn(TOKENS.typography.microLabel, "text-slate-500")}>System Calibrated</span>
                </div>
                <motion.button 
                  whileHover={{ x: 8 }}
                  className={cn(TOKENS.typography.microLabel, "flex items-center gap-2 text-white group/btn")}
                >
                  Engage <ChevronRight size={14} className="text-blue-400 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>

            {/* PRESSURE FEEDBACK OVERLAY */}
            <AnimatePresence>
              {isPressed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-blue-500/5 backdrop-blur-[2px] pointer-events-none z-20"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
