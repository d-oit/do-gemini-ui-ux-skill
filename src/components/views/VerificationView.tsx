import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, AlertTriangle, Zap, Search, Activity } from 'lucide-react';
import { TOKENS, cn, Card } from '../../lib/design-system';

/**
 * VerificationView
 * Demonstrates the "Quality Bar" and "Swarm Architecture" principles.
 * Features: High contrast, zero overlap, motion stability, and token integrity.
 */
export const VerificationView = () => {
  const swarmPersonas = [
    { 
      id: 'researcher', 
      name: 'The Researcher', 
      icon: <Search size={20} />, 
      color: 'text-blue-400',
      desc: 'Proactively searches for design patterns and accessibility standards.'
    },
    { 
      id: 'architect', 
      name: 'The Token Architect', 
      icon: <Shield size={20} />, 
      color: 'text-emerald-400',
      desc: 'Defines and maintains the persistent Design DNA in docs/design/.'
    },
    { 
      id: 'developer', 
      name: 'The Developer', 
      icon: <Zap size={20} />, 
      color: 'text-amber-400',
      desc: 'Implements the UI using semantic tokens and high-fidelity components.'
    },
    { 
      id: 'auditor', 
      name: 'The Auditor', 
      icon: <Activity size={20} />, 
      color: 'text-rose-400',
      desc: 'Performs visual regression and layout audits for zero-overlap compliance.'
    }
  ];

  return (
    <div className={cn("space-y-12")}>
      {/* Quality Bar Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card mode="app" className="relative group">
          <div className={TOKENS.effects.shimmer} />
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={24} />
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Quality Bar: Zero Overlap</h3>
            </div>
            <p className={cn(TOKENS.typography.body, "text-slate-400")}>
              All elements are constrained within flow-based layouts. Absolute positioning is reserved for non-blocking atmospheric effects.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[10px] text-slate-500">
                  NODE_{i}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card mode="app" className="relative group">
          <div className={TOKENS.effects.shimmer} />
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-500" size={24} />
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Anti-Slop Protection</h3>
            </div>
            <p className={cn(TOKENS.typography.body, "text-slate-400")}>
              Zero generic AI-generated design language. Every pixel is driven by opinionated semantic tokens.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">No Inter Default</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">No Purple Gradients</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Swarm Architecture Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-white tracking-tighter uppercase">Swarm Architecture</h3>
          <p className="text-slate-500 max-w-xl mx-auto">Specialized internal personas collaborating to ensure design integrity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {swarmPersonas.map((persona, i) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card mode="app" className="hover:border-white/20 transition-colors group">
                <div className="space-y-4">
                  <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform", persona.color)}>
                    {persona.icon}
                  </div>
                  <h4 className="font-bold text-white tracking-tight">{persona.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{persona.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Verification Status */}
      <div className={cn(
        "p-6 rounded-[32px] border border-emerald-500/20 bg-emerald-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
      )}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <CheckCircle2 className="text-white" size={24} />
          </div>
          <div>
            <h4 className="text-white font-bold tracking-tight">Skill Verified</h4>
            <p className="text-xs text-emerald-400/60 font-mono uppercase tracking-widest">Status: 100% Token Aligned</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Last Audit</p>
            <p className="text-sm text-white font-mono">2026-04-11 10:15</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Coverage</p>
            <p className="text-sm text-white font-mono">98.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
