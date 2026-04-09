# Stitch Design Token Alignment Reference

Stitch alignment ensures that tokens are consistent across documentation and code.

## Alignment Rules
- `docs/design/design-system.md` is the source of truth.
- `src/lib/design-system.tsx` must mirror the documented tokens.
- Use the `validate-tokens.cjs` script to check for drift.
