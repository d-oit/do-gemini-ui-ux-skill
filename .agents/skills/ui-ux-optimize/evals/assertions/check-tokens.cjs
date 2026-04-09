const fs = require('fs');
const path = require('path');

/**
 * Simple assertion engine for UI/UX evals.
 */
function runAssertion(output, expectations) {
  const results = {
    passed: true,
    failures: []
  };

  if (expectations.contains) {
    expectations.contains.forEach(term => {
      if (!output.includes(term)) {
        results.passed = false;
        results.failures.push(`Missing expected term: ${term}`);
      }
    });
  }

  if (expectations.not_contains) {
    expectations.not_contains.forEach(term => {
      // For Tailwind classes, we want to ensure it's not a standalone class
      // We check for whitespace, quotes, or start/end of string
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[\\s"'])${escapedTerm}([\\s"']|$)`, 'g');
      if (regex.test(output)) {
        results.passed = false;
        results.failures.push(`Found forbidden term: ${term}`);
      }
    });
  }

  return results;
}

module.exports = { runAssertion };
