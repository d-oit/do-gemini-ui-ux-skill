# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug_mobile.spec.ts >> Verify mobile visibility and overlap
- Location: tests/debug_mobile.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - img [ref=e8]
      - navigation [ref=e10]:
        - button "app" [ref=e11]
        - button "game" [ref=e12]
        - button "bento" [ref=e13]
        - button "2026" [ref=e14]
        - button "command" [ref=e15]
        - button "fluid" [ref=e16]
        - button "neural" [active] [ref=e17]: neural
        - button "fitness" [ref=e19]
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]: Neural Network
      - heading "Neural Brain Visualizer" [level=2] [ref=e26]
      - paragraph [ref=e27]: Interactive neural network simulation visualizing synaptic load and core processing nodes.
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img
        - button "Central Cortex" [ref=e32]:
          - img [ref=e35]
          - generic [ref=e43]: Central Cortex
        - button "Logic Gate A" [ref=e44]:
          - img [ref=e47]
          - generic [ref=e49]: Logic Gate A
        - button "Logic Gate B" [ref=e50]:
          - img [ref=e53]
          - generic [ref=e55]: Logic Gate B
        - button "Memory Bank 1" [ref=e56]:
          - img [ref=e59]
          - generic [ref=e62]: Memory Bank 1
        - button "Memory Bank 2" [ref=e63]:
          - img [ref=e66]
          - generic [ref=e69]: Memory Bank 2
        - button "Output Buffer" [ref=e70]:
          - img [ref=e73]
          - generic [ref=e81]: Output Buffer
        - generic [ref=e82]:
          - generic [ref=e83]:
            - paragraph [ref=e84]: Neural Status
            - paragraph [ref=e85]: Synchronized
          - generic [ref=e86]:
            - img [ref=e87]
            - textbox "Search neurons..." [ref=e90]
      - generic [ref=e92]:
        - generic [ref=e93]:
          - generic [ref=e94]:
            - img [ref=e96]
            - generic [ref=e98]:
              - paragraph [ref=e99]: Global Sync Rate
              - paragraph [ref=e100]: 98.4%
          - generic [ref=e101]:
            - img [ref=e103]
            - generic [ref=e109]:
              - paragraph [ref=e110]: Active Synapses
              - paragraph [ref=e111]: 1,240
        - generic [ref=e112]:
          - button "Optimize Network" [ref=e113]:
            - img [ref=e114]
            - generic [ref=e116]: Optimize Network
          - generic [ref=e117]:
            - heading "System Logs" [level=4] [ref=e118]
            - generic [ref=e119]:
              - generic [ref=e120]:
                - generic [ref=e121]: "[10:45:02]"
                - generic [ref=e122]: Neural handshake successful.
              - generic [ref=e123]:
                - generic [ref=e124]: "[11:45:02]"
                - generic [ref=e125]: Memory bank 2 optimization complete.
              - generic [ref=e126]:
                - generic [ref=e127]: "[12:45:02]"
                - generic [ref=e128]: Logic gate B load spike detected.
              - generic [ref=e129]:
                - generic [ref=e130]: "[13:45:02]"
                - generic [ref=e131]: Central cortex at peak efficiency.
    - generic [ref=e132]:
      - generic [ref=e135]: Neural Training Data Feed
      - generic [ref=e136]:
        - generic [ref=e138]:
          - generic [ref=e139]: LAYER_0
          - generic [ref=e140]: "0.4245"
        - generic [ref=e144]:
          - generic [ref=e145]: LAYER_1
          - generic [ref=e146]: "0.8649"
        - generic [ref=e150]:
          - generic [ref=e151]: LAYER_2
          - generic [ref=e152]: "0.3590"
        - generic [ref=e156]:
          - generic [ref=e157]: LAYER_3
          - generic [ref=e158]: "0.2912"
        - generic [ref=e162]:
          - generic [ref=e163]: LAYER_4
          - generic [ref=e164]: "0.4957"
        - generic [ref=e168]:
          - generic [ref=e169]: LAYER_5
          - generic [ref=e170]: "0.7382"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Verify mobile visibility and overlap', async ({ page }) => {
  4  |   await page.setViewportSize({ width: 375, height: 667 });
  5  |   await page.goto('/');
  6  |   await page.click('button:has-text("neural")');
  7  |   await page.waitForTimeout(1000);
  8  | 
  9  |   const visualizer = page.locator('.lg\\:col-span-7').first();
  10 |   const hud = visualizer.locator('.z-20').first();
  11 |   const hudBox = await hud.boundingBox();
  12 |   console.log('Mobile HUD Box:', hudBox);
  13 |   
  14 |   const neurons = visualizer.locator('button.z-10');
  15 |   const count = await neurons.count();
  16 |   console.log(`Found ${count} neurons`);
  17 |   
  18 |   for (let i = 0; i < count; i++) {
  19 |     const neuron = neurons.nth(i);
  20 |     const neuronBox = await neuron.boundingBox();
  21 |     
  22 |     // Check label visibility
  23 |     const label = neuron.locator('span');
  24 |     await expect(label).toBeVisible();
  25 |     const labelBox = await label.boundingBox();
  26 |     
  27 |     if (neuronBox && hudBox) {
  28 |       const overlaps = !(
  29 |         neuronBox.x + neuronBox.width < hudBox.x ||
  30 |         neuronBox.x > hudBox.x + hudBox.width ||
  31 |         neuronBox.y + neuronBox.height < hudBox.y ||
  32 |         neuronBox.y > hudBox.y + hudBox.height
  33 |       );
  34 |       console.log(`Neuron ${i} overlaps HUD: ${overlaps}`);
> 35 |       expect(overlaps).toBe(false);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  36 |     }
  37 |     
  38 |     if (labelBox && hudBox) {
  39 |       const overlaps = !(
  40 |         labelBox.x + labelBox.width < hudBox.x ||
  41 |         labelBox.x > hudBox.x + hudBox.width ||
  42 |         labelBox.y + labelBox.height < hudBox.y ||
  43 |         labelBox.y > hudBox.y + hudBox.height
  44 |       );
  45 |       console.log(`Label ${i} overlaps HUD: ${overlaps}`);
  46 |       expect(overlaps).toBe(false);
  47 |     }
  48 |   }
  49 | });
  50 | 
```