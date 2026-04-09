import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Activity, Cpu, Share2, Info } from 'lucide-react';
import { TOKENS, cn, Card } from '../../lib/design-system';

interface Neuron {
  id: number;
  x: number;
  y: number;
  label: string;
  load: number;
  type: 'core' | 'logic' | 'memory';
}

export const NeuralView = () => {
  const [selectedNeuron, setSelectedNeuron] = useState<Neuron | null>(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [neurons] = useState<Neuron[]>([
    { id: 1, x: 50, y: 50, label: 'Central Cortex', load: 78, type: 'core' },
    { id: 2, x: 30, y: 30, label: 'Logic Gate A', load: 45, type: 'logic' },
    { id: 3, x: 70, y: 30, label: 'Logic Gate B', load: 92, type: 'logic' },
    { id: 4, x: 20, y: 60, label: 'Memory Bank 1', load: 12, type: 'memory' },
    { id: 5, x: 80, y: 60, label: 'Memory Bank 2', load: 64, type: 'memory' },
    { id: 6, x: 50, y: 80, label: 'Output Buffer', load: 33, type: 'core' },
  ]);

  const styles = TOKENS.colors.neural;

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]", TOKENS.layout.safeArea)}>
      {/* BRAIN VISUALIZER (7 COLUMNS) */}
      <div className={cn("lg:col-span-7 relative h-[400px] lg:h-[600px] rounded-[40px] border overflow-hidden group", TOKENS.effects.antiFlicker)} style={{ backgroundColor: '#020617' }}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5,transparent_70%)]" />
        
        {/* SVG CONNECTIONS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="synapse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {neurons.map((n, i) => (
            neurons.slice(i + 1).map(target => (
              <motion.line
                key={`${n.id}-${target.id}`}
                x1={`${n.x}%`}
                y1={`${n.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#synapse-grad)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            ))
          ))}
        </svg>

        {/* NEURON NODES */}
        {neurons.map((n) => (
          <motion.button
            key={n.id}
            onClick={() => setSelectedNeuron(n)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className={cn(
              "w-12 h-12 rounded-full border flex items-center justify-center relative",
              TOKENS.atmospheric.glass.blur,
              n.type === 'core' ? 'border-cyan-500/50 bg-cyan-500/10' : 
              n.type === 'logic' ? 'border-fuchsia-500/50 bg-fuchsia-500/10' : 
              'border-indigo-500/50 bg-indigo-500/10'
            )}>
              {/* Pulse Ring */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "absolute inset-0 rounded-full border",
                  n.type === 'core' ? 'border-cyan-400' : 
                  n.type === 'logic' ? 'border-fuchsia-400' : 
                  'border-indigo-400'
                )}
              />
              {n.type === 'core' ? <Brain size={18} className="text-cyan-400" /> : 
               n.type === 'logic' ? <Zap size={18} className="text-fuchsia-400" /> : 
               <Cpu size={18} className="text-indigo-400" />}
            </div>
            <span className={cn(TOKENS.typography.microLabel, "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/40")}>
              {n.label}
            </span>
          </motion.button>
        ))}

        {/* HUD OVERLAY */}
        <div className="absolute top-6 left-6 p-4 rounded-2xl border bg-black/40 backdrop-blur-xl border-white/10 space-y-1">
          <p className={cn(TOKENS.typography.microLabel, "text-cyan-400")}>Neural Status</p>
          <p className="text-xl font-bold text-white tracking-tighter">Synchronized</p>
        </div>
      </div>

      {/* TELEMETRY PANEL (5 COLUMNS) */}
      <div className="lg:col-span-5 space-y-6">
        <AnimatePresence mode="wait">
          {selectedNeuron ? (
            <motion.div
              key="neuron-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card mode="neural" className={cn("p-8 space-y-6 relative overflow-hidden")}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Brain size={120} className="text-cyan-400" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <Zap size={20} className="text-cyan-400" />
                    </div>
                    <h3 className={cn(TOKENS.typography.heading, "text-2xl text-white")}>{selectedNeuron.label}</h3>
                  </div>
                  <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Node ID: {selectedNeuron.id} • Type: {selectedNeuron.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className={cn(TOKENS.typography.microLabel, "text-white/30")}>Current Load</p>
                    <p className="text-2xl font-bold text-cyan-400">{selectedNeuron.load}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className={cn(TOKENS.typography.microLabel, "text-white/30")}>Latency</p>
                    <p className="text-2xl font-bold text-fuchsia-400">12ms</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>Throughput Capacity</span>
                    <span>{selectedNeuron.load}/100 GB/s</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNeuron.load}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedNeuron(null)}
                  className="w-full py-4 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  Return to Overview
                </button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="system-overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <Card mode="neural" className={cn("p-6 flex items-center gap-6")}>
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Activity size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Global Sync Rate</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">98.4%</p>
                  </div>
                </Card>

                <Card mode="neural" className={cn("p-6 flex items-center gap-6")}>
                  <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20">
                    <Share2 size={24} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Active Synapses</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">1,240</p>
                  </div>
                </Card>
              </div>

              <div className={cn("p-8 rounded-[40px] border space-y-6", styles.surface, styles.border)}>
                <h4 className={cn(TOKENS.typography.microLabel, "text-white")}>System Logs</h4>
                <div className="space-y-4">
                  {[
                    "Neural handshake successful.",
                    "Memory bank 2 optimization complete.",
                    "Logic gate B load spike detected.",
                    "Central cortex at peak efficiency."
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-[11px] font-mono text-white/40">
                      <span className="text-cyan-500">[{10 + i}:45:02]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
