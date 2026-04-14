import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Zap, Target, Pause } from 'lucide-react';
import { TOKENS, cn } from '../../lib/design-system';

export const GameView = () => {
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [isFiring, setIsFiring] = useState(false);
  const [health, setHealth] = useState(85);
  const [energy, setEnergy] = useState(60);

  const handleJoystick = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = ((clientX - rect.left) / rect.width - 0.5) * 60;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 60;
    setJoystickPos({ x, y });
  };

  const resetJoystick = () => setJoystickPos({ x: 0, y: 0 });

  return (
    <div className={cn(
      "relative h-auto min-h-[400px] md:min-h-[500px] w-full border select-none touch-none shadow-2xl",
      TOKENS.colors.game.bg,
      TOKENS.colors.game.border,
      TOKENS.radius.app
    )}>
      {/* DYNAMIC PARALLAX STARFIELD */}
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none")}>
        <motion.div 
          animate={{ 
            x: joystickPos.x * -0.5,
            y: joystickPos.y * -0.5,
            scale: isFiring ? 1.02 : 1
          }}
          className="absolute inset-[-20%] opacity-40"
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 'px',
                height: Math.random() * 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2,
                boxShadow: Math.random() > 0.8 ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
              }}
            />
          ))}
        </motion.div>
        
        {/* Nebula Layer */}
        <motion.div 
          animate={{ 
            x: joystickPos.x * -1.2,
            y: joystickPos.y * -1.2,
            rotate: isFiring ? [0, 0.5, -0.5, 0] : 0
          }}
          className="absolute inset-[-50%] opacity-20 blur-[100px]"
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full" />
        </motion.div>
      </div>

      {/* 3D PROJECTED HUD */}
      <div className="absolute inset-0 p-3 md:p-10 flex flex-col justify-between pointer-events-none" style={{ perspective: 1000 }}>
        <motion.div 
          animate={{ 
            rotateX: joystickPos.y * 0.1,
            rotateY: joystickPos.x * -0.1,
            translateZ: 20
          }}
          className="flex flex-row justify-between items-start gap-2 md:gap-4"
        >
          {/* Health & Energy Panels */}
          <div className="flex flex-col gap-2 w-32 md:w-48">
            <div className={cn(
              "p-2 md:p-4 border rounded-lg md:rounded-2xl space-y-1 md:space-y-3",
              TOKENS.atmospheric.glass.blur,
              TOKENS.colors.game.surface,
              TOKENS.colors.game.border
            )}>
              <div className="flex justify-between items-center text-[7px] md:text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                <div className="flex items-center gap-1 md:gap-2"><Heart size={8} className="md:size-[10px]" fill="currentColor" /> Vitals</div>
                <span className={cn(TOKENS.typography.mono)}>{health}%</span>
              </div>
              <div className="h-0.5 md:h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${health}%` }}
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                />
              </div>
            </div>

            <div className={cn(
              "p-2 md:p-4 border rounded-lg md:rounded-2xl space-y-1 md:space-y-3",
              TOKENS.atmospheric.glass.blur,
              TOKENS.colors.game.surface,
              TOKENS.colors.game.border
            )}>
              <div className="flex justify-between items-center text-[7px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                <div className="flex items-center gap-1 md:gap-2"><Zap size={8} className="md:size-[10px]" fill="currentColor" /> Core</div>
                <span className={cn(TOKENS.typography.mono)}>{energy}%</span>
              </div>
              <div className="h-0.5 md:h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: isFiring ? `${energy - 10}%` : `${energy}%` }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>
            </div>
          </div>
          
          {/* Score Panel */}
          <div className={cn(
            "p-3 md:p-6 border rounded-xl md:rounded-3xl text-right",
            TOKENS.atmospheric.glass.blur,
            TOKENS.colors.game.surface,
            TOKENS.colors.game.border
          )}>
            <p className={cn(TOKENS.typography.microLabel, "text-white/40 mb-0.5 md:mb-1 text-[8px] md:text-[10px]")}>Telemetry Score</p>
            <p className={cn(TOKENS.typography.mono, "text-lg md:text-4xl font-bold text-white")}>002,480</p>
          </div>
        </motion.div>

        {/* CONTROLS SECTION */}
        <div className="flex justify-between items-end gap-4">
          {/* TACTILE JOYSTICK */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div 
              onMouseMove={handleJoystick}
              onMouseLeave={resetJoystick}
              onTouchMove={handleJoystick}
              onTouchEnd={resetJoystick}
              className={cn(
                "w-24 h-24 md:w-40 md:h-40 rounded-full border flex items-center justify-center pointer-events-auto cursor-none relative overflow-hidden",
                TOKENS.atmospheric.glass.blur,
                TOKENS.colors.game.surface,
                TOKENS.colors.game.border
              )}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <div className="w-full h-px bg-white" />
                <div className="h-full w-px bg-white absolute" />
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-white" />
              </div>

              <motion.div 
                animate={{ 
                  x: joystickPos.x * 0.6, 
                  y: joystickPos.y * 0.6,
                  scale: isFiring ? 0.95 : 1
                }}
                transition={{ type: "spring", stiffness: 600, damping: 35 }}
                className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 shadow-2xl border border-white/20 flex items-center justify-center"
              >
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-blue-500/20 border border-blue-500/40" />
              </motion.div>
            </div>
          </div>
          
          {/* ACTION BUTTONS */}
          <div className="flex gap-3 md:gap-6 pointer-events-auto">
            <motion.button 
              onPointerDown={() => setIsFiring(true)}
              onPointerUp={() => setIsFiring(false)}
              whileTap={TOKENS.effects.haptic.tap}
              className={cn(
                "w-16 h-16 md:w-24 md:h-24 rounded-[24px] md:rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl flex items-center justify-center group relative overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Target size={24} className="md:size-[40px] text-emerald-400 group-hover:scale-110 transition-transform" />
              {isFiring && (
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 bg-emerald-400 rounded-full"
                />
              )}
            </motion.button>

            <motion.button 
              whileTap={TOKENS.effects.haptic.tap}
              className={cn(
                "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center text-white/60 hover:text-white transition-colors",
                TOKENS.colors.game.surface,
                TOKENS.colors.game.border,
                TOKENS.atmospheric.glass.blur
              )}
            >
              <Pause size={18} md:size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* SCREEN SHAKE / DAMAGE EFFECT */}
      <AnimatePresence>
        {isFiring && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
