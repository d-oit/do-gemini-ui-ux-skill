#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsDesignSystemPath = path.join(process.cwd(), 'docs', 'design', 'design-system.md');
const codeDesignSystemPath = path.join(process.cwd(), 'src', 'lib', 'design-system.tsx');

let hasError = false;

if (!fs.existsSync(docsDesignSystemPath)) {
  console.error('❌ Validation Failed: docs/design/design-system.md not found.');
  console.error('   Please run the "Initialize" step of the UI/UX Optimize skill to generate persistent design documentation.');
  hasError = true;
}

if (!fs.existsSync(codeDesignSystemPath)) {
  console.error('❌ Validation Failed: src/lib/design-system.tsx not found.');
  console.error('   Please ensure the Design DNA is initialized in code before running the UI/UX Optimize skill.');
  hasError = true;
} else {
  const content = fs.readFileSync(codeDesignSystemPath, 'utf8');
  if (!content.includes('export const TOKENS')) {
    console.error('❌ Validation Failed: TOKENS object not found in design-system.tsx.');
    console.error('   The design system must export a TOKENS object as the source of truth.');
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log('✅ Validation Passed: Persistent Design Docs and Design DNA (TOKENS) are present.');
process.exit(0);
