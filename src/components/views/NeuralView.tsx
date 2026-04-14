import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Activity, Cpu, Share2, Info, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [neurons, setNeurons] = useState<Neuron[]>([
    { id: 1, x: 50, y: 60, label: 'Central Cortex', load: 78, type: 'core' },
    { id: 2, x: 85, y: 55, label: 'Logic Gate A', load: 45, type: 'logic' },
    { id: 3, x: 80, y: 75, label: 'Logic Gate B', load: 92, type: 'logic' },
    { id: 4, x: 20, y: 85, label: 'Memory Bank 1', load: 12, type: 'memory' },
    { id: 5, x: 75, y: 90, label: 'Memory Bank 2', load: 64, type: 'memory' },
    { id: 6, x: 45, y: 85, label: 'Output Buffer', load: 33, type: 'core' },
  ]);

  const filteredNeurons = useMemo(() => {
    return neurons.filter(n => 
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [neurons, searchQuery]);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setOptimizationComplete(false);
    
    // Simulate optimization process
    setTimeout(() => {
      setNeurons(prev => prev.map(n => ({
        ...n,
        load: Math.max(10, Math.min(60, n.load - 20 + Math.random() * 10))
      })));
      setIsOptimizing(false);
      setOptimizationComplete(true);
      
      setTimeout(() => setOptimizationComplete(false), 3000);
    }, 2000);
  };

  const styles = TOKENS.colors.neural;

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 w-full", TOKENS.layout.safeArea)}>
      {/* BRAIN VISUALIZER (7 COLUMNS) */}
      <div className={cn("lg:col-span-7 relative h-auto min-h-[400px] lg:min-h-[500px] rounded-[40px] border group shadow-2xl")} style={{ backgroundColor: '#020617' }}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#4f46e5,transparent_70%)]" />
        
        {/* SVG CONNECTIONS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="synapse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {neurons.map((n, i) => (
            neurons.slice(i + 1).map(target => (
              <React.Fragment key={`${n.id}-${target.id}`}>
                <motion.line
                  x1={`${n.x}%`}
                  y1={`${n.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#synapse-grad)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                />
                {/* Neural Impulse Animation */}
                <motion.circle
                  r="2"
                  fill="#22d3ee"
                  filter="url(#glow)"
                  initial={{ offset: 0 }}
                  animate={{ 
                    cx: [`${n.x}%`, `${target.x}%`],
                    cy: [`${n.y}%`, `${target.y}%`],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                />
              </React.Fragment>
            ))
          ))}
        </svg>

        {/* NEURON NODES */}
        {filteredNeurons.map((n) => (
          <motion.button
            key={n.id}
            onClick={() => setSelectedNeuron(n)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className={cn(
              "w-12 h-12 rounded-full border flex items-center justify-center relative transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
              TOKENS.atmospheric.glass.blur,
              selectedNeuron?.id === n.id ? 'scale-110 border-white bg-white/30' : 
              n.type === 'core' ? 'border-cyan-500/60 bg-cyan-500/20' : 
              n.type === 'logic' ? 'border-fuchsia-500/60 bg-fuchsia-500/20' : 
              'border-indigo-500/60 bg-indigo-500/20'
            )}>
              {/* Pulse Ring */}
              <motion.div 
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className={cn(
                  "absolute inset-0 rounded-full border-2",
                  n.type === 'core' ? 'border-cyan-400/50' : 
                  n.type === 'logic' ? 'border-fuchsia-400/50' : 
                  'border-indigo-400/50'
                )}
              />
              {n.type === 'core' ? <Brain size={20} className="text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" /> : 
               n.type === 'logic' ? <Zap size={20} className="text-fuchsia-300 drop-shadow-[0_0_8px_rgba(240,171,252,0.5)]" /> : 
               <Cpu size={20} className="text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]" />}
            </div>
            <span className={cn(
              TOKENS.typography.microLabel, 
              "absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-white font-bold tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            )}>
              {n.label}
            </span>
          </motion.button>
        ))}

        {/* HUD OVERLAY */}
        <div className={cn(
          "absolute top-4 left-4 md:top-8 md:left-8 p-4 md:p-6 rounded-2xl md:rounded-3xl border bg-black/90 backdrop-blur-3xl border-white/20 space-y-3 md:space-y-4 w-[calc(100%-32px)] md:w-72 z-20 shadow-2xl"
        )}>
          <div className="space-y-1">
            <p className={cn(TOKENS.typography.microLabel, "text-cyan-400 font-bold")}>Neural Status</p>
            <p className="text-lg md:text-2xl font-bold text-white tracking-tighter drop-shadow-sm">Synchronized</p>
          </div>
          
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search neurons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all font-medium"
            />
          </div>
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
              <Card mode="neural" className={cn("p-8 space-y-6 relative border-indigo-500/30")}>
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
                    <p className="text-2xl font-bold text-cyan-400">{selectedNeuron.load.toFixed(1)}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className={cn(TOKENS.typography.microLabel, "text-white/30")}>Latency</p>
                    <p className="text-2xl font-bold text-fuchsia-400">12ms</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>Throughput Capacity</span>
                    <span>{selectedNeuron.load.toFixed(1)}/100 GB/s</span>
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
                <Card mode="neural" className={cn("p-6 flex items-center gap-6 border-cyan-500/20")}>
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Activity size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Global Sync Rate</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">98.4%</p>
                  </div>
                </Card>

                <Card mode="neural" className={cn("p-6 flex items-center gap-6 border-fuchsia-500/20")}>
                  <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20">
                    <Share2 size={24} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <p className={cn(TOKENS.typography.microLabel, "text-white/40")}>Active Synapses</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">1,240</p>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className={cn(
                    "w-full py-6 rounded-[32px] border flex items-center justify-center gap-3 transition-all group relative",
                    isOptimizing ? "bg-cyan-500/20 border-cyan-500/50" : "bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5"
                  )}
                >
                  {isOptimizing ? (
                    <RefreshCw size={20} className="text-cyan-400 animate-spin" />
                  ) : optimizationComplete ? (
                    <CheckCircle2 size={20} className="text-emerald-400" />
                  ) : (
                    <Zap size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  )}
                  <span className={cn(TOKENS.typography.microLabel, "text-white tracking-[0.4em]")}>
                    {isOptimizing ? "Optimizing..." : optimizationComplete ? "Optimization Complete" : "Optimize Network"}
                  </span>
                  
                  {isOptimizing && (
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                    />
                  )}
                </button>

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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
