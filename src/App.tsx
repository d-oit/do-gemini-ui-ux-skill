import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Zap,
  Menu
} from 'lucide-react';

import { TOKENS, Card, cn, type DesignMode } from './lib/design-system';
import { AppView } from './components/views/AppView';
import { GameView } from './components/views/GameView';
import { BentoView } from './components/views/BentoView';
import { Trends2026View } from './components/views/Trends2026View';
import { SpatialCommandCenter } from './components/views/SpatialCommandCenter';
import { FluidView } from './components/views/FluidView';
import { NeuralView } from './components/views/NeuralView';
import { VerificationView } from './components/views/VerificationView';
import { ScreenshotGallery } from './components/views/ScreenshotGallery';
import FitnessTracker from './FitnessTracker';

// --- MAIN APP ---

export default function App() {
  const [mode, setMode] = useState<'app' | 'game' | 'bento' | '2026' | 'command' | 'fluid' | 'neural' | 'fitness' | 'verify' | 'gallery'>('app');
  
  const currentStyles = mode === 'game' ? TOKENS.colors.game : mode === 'neural' ? TOKENS.colors.neural : mode === 'fitness' ? TOKENS.colors.technical : TOKENS.colors.app;
  
  const designMode = (m: typeof mode): DesignMode => {
    if (m === 'game') return 'game';
    if (m === 'neural') return 'neural';
    if (m === 'fitness') return 'technical';
    return 'app';
  };

  React.useEffect(() => {
    document.body.className = cn(
      "m-0 p-0 overflow-x-hidden overflow-y-auto transition-colors duration-700 font-sans selection:bg-blue-500/30",
      currentStyles.bg
    );
  }, [currentStyles.bg]);

  return (
    <div className={cn("w-full", currentStyles.text)}>
      {/* Floating Header */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <div className={cn(
          "px-4 md:px-6 py-2 md:py-3 rounded-[24px] md:rounded-[32px] flex justify-between items-center gap-4 border border-white/10",
          TOKENS.effects.glass
        )}>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <motion.div 
              layoutId="app-icon"
              className={cn("p-1.5 md:p-2 rounded-xl md:rounded-2xl text-white", currentStyles.primary)}
            >
              {mode === 'app' ? <LayoutDashboard size={18} /> : mode === 'game' ? <Gamepad2 size={18} /> : mode === 'bento' ? <Menu size={18} /> : <Zap size={18} />}
            </motion.div>
            <h1 className={cn("text-[10px] md:text-sm font-bold tracking-tighter hidden sm:block", currentStyles.text)}>UI/UX OPTIMIZE</h1>
          </div>
          
          <nav className={cn(
            "flex bg-white/5 p-1 rounded-xl md:rounded-2xl border border-white/5",
            TOKENS.layout.mobileNav
          )}>
            {(['app', 'game', 'bento', '2026', 'command', 'fluid', 'neural', 'fitness', 'verify', 'gallery'] as const).map(m => (
              <button 
                key={m}
                onClick={() => setMode(m)}
                className="relative px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold transition-all whitespace-nowrap uppercase tracking-widest z-10 flex-shrink-0"
              >
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  mode === m 
                    ? (mode === 'game' ? 'text-black' : mode === 'neural' ? 'text-cyan-400' : mode === 'fitness' ? 'text-white' : 'text-blue-600') 
                    : 'text-slate-500 hover:text-slate-300'
                )}>
                  {m}
                </span>
                {mode === m && (
                  <motion.div 
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 rounded-lg md:rounded-xl shadow-lg z-0",
                      mode === 'fitness' ? 'bg-[#141414]' : 'bg-white'
                    )}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            {/* Extra padding for scroll visibility */}
            <div className="w-8 flex-shrink-0 sm:hidden" />
          </nav>
        </div>
      </header>

      <main className={cn(TOKENS.layout.container, "pt-20 md:pt-28 pb-12 md:pb-20 relative z-10")}>
        <section className="space-y-2 text-center md:text-left mb-6 md:mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 justify-center md:justify-start"
          >
            <span className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>
              {mode === 'app' ? 'Production Dashboard' : mode === 'game' ? 'Gameplay Interface' : mode === 'bento' ? 'Bento Grid Layout' : mode === '2026' ? 'Atmospheric Depth' : mode === 'command' ? 'Spatial Command' : mode === 'fluid' ? 'Fluid Dynamics' : mode === 'neural' ? 'Neural Network' : mode === 'fitness' ? 'Fitness Telemetry' : mode === 'gallery' ? 'Visual Audit' : 'Skill Verification'}
            </span>
            <span className={cn("h-px w-12", currentStyles.border)} />
          </motion.div>
          
          <motion.h2 
            key={`${mode}-title`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(TOKENS.typography.heading, currentStyles.text, "break-words max-w-full text-center md:text-left")}
          >
            {mode === 'app' ? 'System Performance Monitor' : mode === 'game' ? 'Tactical Combat HUD' : mode === 'bento' ? 'Project Grid Layout' : mode === '2026' ? 'Spatial UI Experiment' : mode === 'command' ? 'Spatial Command Center' : mode === 'fluid' ? 'Fluid Motion Systems' : mode === 'neural' ? 'Neural Brain Visualizer' : mode === 'fitness' ? 'Performance Telemetry' : mode === 'gallery' ? 'Responsive Audit Gallery' : 'Skill Architecture Verification'}
          </motion.h2>
          
          <motion.p 
            key={`${mode}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("max-w-2xl text-lg leading-relaxed mx-auto md:mx-0 break-words", currentStyles.muted)}
          >
            {mode === 'app' 
              ? 'Real-time telemetry and resource allocation interface for enterprise-scale infrastructure.' 
              : mode === 'game'
              ? 'Low-latency telemetry overlay for high-precision tactical engagement.'
              : mode === 'bento'
              ? 'Hierarchical grid system for multi-format content distribution and scanning.'
              : mode === '2026'
              ? 'Spatial depth simulation using Z-axis layering, refractive blurs, and rim-light highlights.'
              : mode === 'command'
              ? 'A comprehensive integration of spatial surfaces, contextual lighting, and adaptive density patterns.'
              : mode === 'fluid'
              ? 'Physics-based animations and Dynamic Island 2.0 components for ultra-responsive feedback.'
              : mode === 'neural'
              ? 'Interactive neural network simulation visualizing synaptic load and core processing nodes.'
              : mode === 'fitness'
              ? 'High-density performance tracking for elite athletes and health-conscious users.'
              : mode === 'gallery'
              ? 'Visual verification of layout across Desktop, Tablet, and Mobile viewports.'
              : 'Validating the UI/UX Prompt Optimizer workflow, swarm architecture, and quality bar compliance.'}
          </motion.p>
        </section>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            data-testid="view-container"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full"
          >
            {mode === 'app' ? <AppView /> : mode === 'game' ? <GameView /> : mode === 'bento' ? <BentoView /> : mode === '2026' ? <Trends2026View /> : mode === 'command' ? <SpatialCommandCenter /> : mode === 'fluid' ? <FluidView /> : mode === 'neural' ? <NeuralView /> : mode === 'fitness' ? <FitnessTracker /> : mode === 'gallery' ? <ScreenshotGallery /> : <VerificationView />}
          </motion.div>
        </AnimatePresence>

        {/* Live Training Data Feed */}
        <div data-testid="training-feed" className="mt-8 border-t border-white/10 pt-6 pb-0">
          <div className="flex items-center gap-4 mb-4 opacity-80">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white font-bold">Neural Training Data Feed</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className={cn("font-mono text-[10px] p-4 rounded-xl border backdrop-blur-md", currentStyles.border, "bg-white/10", "text-white")}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold opacity-90">LAYER_{i}</span>
                  <span className="text-blue-400 font-bold">{(Math.random() * 0.9).toFixed(4)}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
