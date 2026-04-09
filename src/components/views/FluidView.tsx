import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  Activity, 
  Settings, 
  ChevronRight, 
  Play, 
  Pause, 
  SkipForward, 
  Timer as TimerIcon,
  Bell
} from 'lucide-react';
import { TOKENS, cn } from '../../lib/design-system';

type IslandState = 'idle' | 'music' | 'timer' | 'notification' | 'expanded';

export const FluidView = () => {
  const [islandState, setIslandState] = useState<IslandState>('idle');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [items, setItems] = useState([
    { id: 1, title: 'Neural Sync', icon: <Zap />, color: 'from-blue-500 to-blue-600', glow: 'shadow-blue-500/20' },
    { id: 2, title: 'Data Flow', icon: <TrendingUp />, color: 'from-emerald-500 to-emerald-600', glow: 'shadow-emerald-500/20' },
    { id: 3, title: 'Core Pulse', icon: <Activity />, color: 'from-rose-500 to-rose-600', glow: 'shadow-rose-500/20' }
  ]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (islandState === 'timer' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [islandState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerNotification = (msg: string) => {
    setActiveNotification(msg);
    setIslandState('notification');
    setTimeout(() => {
      setActiveNotification(null);
      setIslandState('idle');
    }, 3000);
  };

  const shuffleItems = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const getIslandDimensions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    switch (islandState) {
      case 'notification': return { width: isMobile ? 300 : 320, height: 64 };
      case 'music': return { width: isMobile ? 220 : 240, height: 48 };
      case 'timer': return { width: 140, height: 48 };
      case 'expanded': return { width: isMobile ? '94%' : 440, height: isMobile ? 380 : 320 };
      default: return { width: 180, height: 40 };
    }
  };

  const { width, height } = getIslandDimensions();

  return (
    <div className={cn("space-y-10 md:space-y-16 py-10 md:py-20 px-4 overflow-x-hidden", TOKENS.colors.app.bg)}>
      {/* 2026 LIQUID DYNAMIC ISLAND SYSTEM */}
      <div className="flex justify-center sticky top-20 md:top-24 z-50 overflow-visible">
        <motion.div 
          layout
          initial={{ borderRadius: 40 }}
          animate={{ 
            width,
            height,
            backgroundColor: islandState === 'notification' ? 'rgba(37, 99, 235, 0.95)' : 'rgba(10, 10, 10, 0.9)',
            borderRadius: islandState === 'expanded' ? 32 : 40,
          }}
          transition={TOKENS.motion.fluid}
          className={cn(
            TOKENS.effects.glassRefractive,
            TOKENS.effects.antiFlicker,
            "flex flex-col items-center justify-center overflow-hidden cursor-pointer group relative"
          )}
          onClick={() => setIslandState(prev => prev === 'expanded' ? 'idle' : 'expanded')}
        >
          {/* Liquid Shimmer Effect */}
          <div className={TOKENS.effects.shimmer} />

          <AnimatePresence mode="wait">
            {islandState === 'notification' && (
              <motion.div 
                key="notif"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                className="flex items-center gap-3 md:gap-4 px-4 md:px-6 w-full text-white font-bold text-xs md:text-sm tracking-tight"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bell size={16} className="text-white" />
                </div>
                <div className="flex-1 truncate">
                  <p className={cn(TOKENS.typography.microLabel, "opacity-60")}>Notification</p>
                  <p className="truncate">{activeNotification}</p>
                </div>
              </motion.div>
            )}

            {islandState === 'music' && (
              <motion.div 
                key="music"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between w-full px-4"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Activity size={12} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className={cn(TOKENS.typography.microLabel, "text-white")}>Neural Beats</span>
                    <div className="flex gap-0.5 items-end h-1.5 md:h-2">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ height: isPlaying ? [3, 6, 3] : 3 }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-0.5 md:w-1 bg-blue-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    {isPlaying ? <Pause size={12} className="text-white" /> : <Play size={12} className="text-white" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setIslandState('idle'); }} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward size={12} className="text-white/40" />
                  </button>
                </div>
              </motion.div>
            )}

            {islandState === 'timer' && (
              <motion.div 
                key="timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 px-4"
              >
                <TimerIcon size={16} className="text-emerald-400" />
                <span className="text-sm font-mono font-bold text-white tracking-widest">{formatTime(timeLeft)}</span>
              </motion.div>
            )}

            {islandState === 'expanded' && (
              <motion.div 
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 md:p-8 w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1 md:space-y-2">
                    <h4 className={cn(TOKENS.typography.heading, "text-white text-xl md:text-2xl")}>System Control</h4>
                    <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Neural Interface v2.0</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={TOKENS.effects.haptic.tap}
                      onClick={(e) => { e.stopPropagation(); setIslandState('music'); }}
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border text-white/60",
                        TOKENS.colors.app.surface,
                        TOKENS.colors.app.border
                      )}
                    >
                      <Activity size={18} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={TOKENS.effects.haptic.tap}
                      onClick={(e) => { e.stopPropagation(); setIslandState('timer'); }}
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border text-white/60",
                        TOKENS.colors.app.surface,
                        TOKENS.colors.app.border
                      )}
                    >
                      <TimerIcon size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  {[
                    { label: 'Neural Load', val: '74%', color: 'text-blue-400' },
                    { label: 'Sync Rate', val: '92%', color: 'text-emerald-400' },
                    { label: 'Uptime', val: '14d', color: 'text-purple-400' },
                    { label: 'Security', val: 'Safe', color: 'text-rose-400' }
                  ].map(item => (
                    <motion.div 
                      key={item.label} 
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className={cn(
                        "p-3 md:p-4 rounded-xl md:rounded-2xl border flex flex-col gap-0.5 md:gap-1",
                        TOKENS.colors.app.surface,
                        TOKENS.colors.app.border
                      )}
                    >
                      <span className={cn(TOKENS.typography.microLabel, "text-white/30")}>{item.label}</span>
                      <span className={cn("text-base md:text-lg font-bold tracking-tight", item.color)}>{item.val}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(37, 99, 235, 1)' }}
                  whileTap={TOKENS.effects.haptic.tap}
                  onClick={(e) => { e.stopPropagation(); shuffleItems(); }}
                  className={cn(
                    "w-full py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl shadow-blue-600/20 transition-colors mt-auto"
                  )}
                >
                  Optimize Network
                </motion.button>
              </motion.div>
            )}

            {islandState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(TOKENS.typography.microLabel, "flex items-center gap-2 text-white/70")}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                <span className="tracking-[0.2em] uppercase text-[9px]">Active</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 2026 VISCOUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-24 md:mt-32">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              whileHover={{ y: -20, scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1.2
              }}
              className={cn(
                "p-10 rounded-[56px] border space-y-8 group cursor-pointer relative overflow-hidden",
                TOKENS.effects.glassRefractive,
                TOKENS.effects.antiFlicker
              )}
              onClick={() => triggerNotification(`${item.title} Initialized`)}
            >
              <motion.div 
                layoutId={`icon-${item.id}`}
                className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-[28px] flex items-center justify-center text-white shadow-2xl ${item.glow} group-hover:rotate-12 transition-transform duration-500`}
              >
                {item.icon}
              </motion.div>

              <div className="space-y-3">
                <h4 className={cn(TOKENS.typography.heading, "text-white")}>{item.title}</h4>
                <p className={cn(TOKENS.typography.body, TOKENS.colors.app.muted)}>
                  Experience <span className="text-white font-medium">viscous motion</span>. Elements react with organic inertia and fluid layout transitions.
                </p>
              </div>

              <div className={cn("flex items-center justify-between pt-6 border-t", TOKENS.colors.app.border)}>
                <div className={cn(TOKENS.typography.microLabel, "flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all")}>
                  Initialize <ChevronRight size={14} />
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-blue-500/40 transition-colors" />
                  ))}
                </div>
              </div>
              
              {/* Liquid Shimmer Effect */}
              <div className={TOKENS.effects.shimmer} />
              
              {/* Refractive Background Decoration */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
