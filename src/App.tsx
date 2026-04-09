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
import FitnessTracker from './FitnessTracker';

// --- MAIN APP ---

export default function App() {
  const [mode, setMode] = useState<'app' | 'game' | 'bento' | '2026' | 'command' | 'fluid' | 'neural' | 'fitness'>('app');
  
  const currentStyles = mode === 'game' ? TOKENS.colors.game : mode === 'neural' ? TOKENS.colors.neural : mode === 'fitness' ? TOKENS.colors.technical : TOKENS.colors.app;
  
  const designMode = (m: typeof mode): DesignMode => {
    if (m === 'game') return 'game';
    if (m === 'neural') return 'neural';
    if (m === 'fitness') return 'technical';
    return 'app';
  };

  return (
    <div className={`min-h-screen ${currentStyles.bg} transition-colors duration-700 font-sans selection:bg-blue-500/30 relative overflow-x-hidden ${TOKENS.effects.antiFlicker}`}>
      {/* Global Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: mode === 'game' ? '10%' : '-10%',
            opacity: mode === 'game' ? 0.4 : 0.2
          }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[160px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: mode === 'game' ? '-10%' : '10%',
            opacity: mode === 'game' ? 0.4 : 0.2
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[160px] rounded-full" 
        />
      </div>

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
            {(['app', 'game', 'bento', '2026', 'command', 'fluid', 'neural', 'fitness'] as const).map(m => (
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

      <main className={cn(TOKENS.layout.container, "pt-32 md:pt-40 pb-24 space-y-12 relative z-10")}>
        <section className="space-y-4 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 justify-center md:justify-start"
          >
            <span className={cn(TOKENS.typography.microLabel, "text-blue-400/60")}>
              {mode === 'app' ? 'Production Dashboard' : mode === 'game' ? 'Gameplay Interface' : mode === 'bento' ? 'Bento Grid Layout' : mode === '2026' ? 'Atmospheric Depth' : mode === 'command' ? 'Spatial Command' : mode === 'fluid' ? 'Fluid Dynamics' : mode === 'neural' ? 'Neural Network' : 'Fitness Telemetry'}
            </span>
            <span className={cn("h-px w-12", currentStyles.border)} />
          </motion.div>
          
          <motion.h2 
            key={`${mode}-title`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(TOKENS.typography.heading, currentStyles.text)}
          >
            {mode === 'app' ? 'System Performance Monitor' : mode === 'game' ? 'Tactical Combat HUD' : mode === 'bento' ? 'Project Grid Layout' : mode === '2026' ? 'Spatial UI Experiment' : mode === 'command' ? 'Spatial Command Center' : mode === 'fluid' ? 'Fluid Motion Systems' : mode === 'neural' ? 'Neural Brain Visualizer' : 'Performance Telemetry'}
          </motion.h2>
          
          <motion.p 
            key={`${mode}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("max-w-2xl text-lg leading-relaxed mx-auto md:mx-0", currentStyles.muted)}
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
              : 'High-density performance tracking for elite athletes and health-conscious users.'}
          </motion.p>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {mode === 'app' ? <AppView /> : mode === 'game' ? <GameView /> : mode === 'bento' ? <BentoView /> : mode === '2026' ? <Trends2026View /> : mode === 'command' ? <SpatialCommandCenter /> : mode === 'fluid' ? <FluidView /> : mode === 'neural' ? <NeuralView /> : <FitnessTracker />}
          </motion.div>
        </AnimatePresence>

        {/* Skill Verification Footer */}
        <footer className={cn("mt-24 pt-12 border-t", currentStyles.border)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className={cn(TOKENS.typography.microLabel, currentStyles.text)}>Design Token Audit</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(mode === 'game' ? TOKENS.colors.game : TOKENS.colors.app).map(([key, val]) => (
                  <div key={key} className={cn("px-4 py-2 rounded-xl border text-[10px] font-mono", currentStyles.border, currentStyles.muted)}>
                    {key}: {val}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className={cn(TOKENS.typography.microLabel, currentStyles.text)}>Self-Learning Loop</h3>
              <Card mode={designMode(mode)} className={cn("text-[11px] font-mono leading-relaxed p-6", currentStyles.text, "opacity-70")}>
                {mode === 'app' 
                  ? "LOG: High-density workflow detected. RULE: Apply 4px sub-grid alignment. RESULT: Improved scanability for telemetry data."
                  : mode === 'game'
                  ? "LOG: Landscape action context. RULE: Enforce 24px safe-area offsets for HUD anchors. RESULT: Prevented thumb occlusion."
                  : mode === 'bento'
                  ? "LOG: Multi-format grid. RULE: Enforce 2:1 aspect ratio for hero cells. RESULT: Balanced visual hierarchy."
                  : mode === '2026'
                  ? "LOG: Spatial UI context. RULE: Use white/[0.02] for refractive surfaces. RESULT: Avoided 'sludge' aesthetic while maintaining depth."
                  : mode === 'command'
                  ? "LOG: Contrast audit failure. RULE: Upgrade 'muted' token from slate-500 to slate-400 and increase surface opacity. RESULT: Guaranteed text readability across all themes."
                  : mode === 'fluid'
                  ? "LOG: Fluid Motion context. RULE: Use physics-based springs for all layout transitions. RESULT: Natural, responsive feel."
                  : mode === 'neural'
                  ? "LOG: Neural Brain context. RULE: Use SVG pathLength for synapse flow. RESULT: High-fidelity brain visualizer."
                  : mode === 'command'
                  ? "LOG: Stitch Alignment audit. RULE: Normalize atmospheric and density tokens. RESULT: Unified design DNA across all platforms."
                  : "LOG: Responsive audit failure. RULE: Implement 'layout.mobileNav' with overflow-x-auto. RESULT: Zero text cutoff on 375px viewports."}
              </Card>
            </div>
            <div className="space-y-6">
              <h3 className={cn(TOKENS.typography.microLabel, currentStyles.text)}>Visual Audit (Simulated)</h3>
              <div className={cn("p-6 rounded-[32px] border space-y-4", currentStyles.border, currentStyles.surface)}>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Screen</span>
                  <span>Status</span>
                </div>
                {[
                  { name: 'Dashboard', status: 'Verified' },
                  { name: 'Combat HUD', status: 'Verified' },
                  { name: 'Bento Grid', status: 'Verified' },
                  { name: 'Spatial UI', status: 'Verified' },
                  { name: 'Fluid Motion', status: 'Verified' },
                  { name: 'Neural Brain', status: 'Verified' },
                  { name: 'Mobile Nav', status: 'Optimized' },
                  { name: 'Stitch Tokens', status: 'Aligned' }
                ].map((s) => (
                  <div key={s.name} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className={cn("text-xs font-medium", currentStyles.text)}>{s.name}</span>
                    <span className={cn("text-[10px] font-bold", s.status === 'Optimized' || s.status === 'Aligned' ? 'text-blue-400' : 'text-emerald-500')}>● {s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
