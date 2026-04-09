# UI/UX Optimize Skill Builder

A production-grade agent skill for upgrading UI/UX requests into precise, token-driven design prompts for apps and games.

## Overview

This project provides a structured framework for converting ambiguous UI/UX requests (e.g., "make it look modern") into technical design specifications. It uses a semantic design system, multi-mode architecture, and automated validation to ensure high-fidelity results.

## Key Features

- **Multi-Mode Design System**: Support for App, Game, Neural, and Technical themes.
- **Atmospheric Effects**: Advanced glassmorphism, refractive blurs, and liquid shimmers.
- **Semantic Tokens**: Centralized source of truth for all design attributes.
- **Automated Validation**: Scripts to ensure token alignment and design stability.
- **Visual Testing**: Integrated Playwright-based testing for visual regression and screenshot generation.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Initialize Design System**:
   Follow the instructions in `docs/design/design-system.md` to customize your tokens.

## Documentation

- [Design System](docs/design/design-system.md)
- [Color Palette](docs/design/color-palette.md)
- [Typography](docs/design/typography.md)
- [Layout & Composition](docs/design/layout.md)
- [Visual Testing & Screenshots](docs/testing.md)

## Testing

We use Playwright for visual regression testing. See [Visual Testing](docs/testing.md) for more details.
