# Design System: Multi-Mode Atmospheric Interface (2026)

This document is the persistent source of truth for the UI/UX design tokens.

## Core Modes

### 1. App (Standard)
- **Background:** `#050505`
- **Surface:** `bg-white/[0.03]`
- **Primary:** `bg-blue-600`
- **Accent:** `text-blue-400`

### 2. Game (Tactical)
- **Background:** `bg-zinc-950`
- **Surface:** `bg-zinc-900/90`
- **Primary:** `bg-emerald-400`
- **Accent:** `text-emerald-400`

### 3. Neural (Brain Visualizer)
- **Background:** `#020617`
- **Surface:** `bg-indigo-500/5`
- **Primary:** `bg-cyan-500`
- **Accent:** `text-fuchsia-400`
- **ContrastText:** `text-white` (For overlays)

### 4. Technical (Fitness Telemetry)
- **Background:** `#E4E3E0`
- **Surface:** `bg-white`
- **Primary:** `#141414`
- **Accent:** `#F27D26`

## Atmospheric Effects
- **Glass Refractive:** `backdrop-blur-[80px] bg-white/[0.01] border border-white/[0.1] shadow-[0_0_50px_rgba(0,0,0,0.5)]`
- **Shimmer:** Dynamic moving gradient for high-impact surfaces.
- **Anti-Flicker:** `will-change-transform transform-gpu backface-visibility-hidden` (Applied to all animated elements).

## Typography
- **Heading:** `font-bold tracking-tighter leading-[1.1]`
- **Body:** `text-sm md:text-base leading-relaxed`
- **MicroLabel:** `text-[10px] font-bold uppercase tracking-[0.3em]`

## Layout & Spacing
- **Container:** `max-w-6xl mx-auto px-4 md:px-6`
- **Gap:** `gap-4 md:gap-6`
- **Radius:** `rounded-[32px]` (App), `rounded-sm` (Game)
- **HUD Safe Zone:** `p-6 md:p-10` (Padding for absolute overlays)
