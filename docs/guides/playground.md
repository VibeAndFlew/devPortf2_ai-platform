# Playground Guide

The Playground provides an interactive environment for testing and comparing AI models with full parameter control.

## Interface

### Left Panel — Input Configuration
1. **Model Selector** — Choose from available models
2. **Parameter Controls** — Temperature, top-p, max tokens, etc.
3. **System Prompt** — Set the system-level instruction
4. **User Message** — Compose the test message
5. **Send** — Execute the request

### Right Panel — Response Display
1. **Response Preview** — Rendered markdown output
2. **Raw JSON** — Full API response
3. **Stats** — Token usage, latency, cost
4. **Comparison** — Side-by-side view (when comparing)

## Parameter Reference

| Parameter | Range | Description |
|-----------|-------|-------------|
| Temperature | 0–2 | Sampling randomness. Lower = more deterministic |
| Top P | 0–1 | Nucleus sampling threshold |
| Max Tokens | 1–16384 | Maximum response length |
| Frequency Penalty | -2–2 | Penalize token repetition |
| Presence Penalty | -2–2 | Penalize topic repetition |
| Stop Sequences | — | Sequences where generation stops |

## Features

### Side-by-Side Comparison
Compare up to 4 model configurations simultaneously:
- Different models with the same prompt
- Same model with different parameters
- Different system prompts
- Output quality comparison

### Preset Management
Save and load parameter presets:
- Save frequently used configurations
- Share presets with team members
- Version parameter experiments

### History
All playground tests are logged:
- Re-run previous tests
- View parameter configurations
- Compare historical results
- Export test results

### Cost Estimation
Real-time cost display:
- Token count estimation before sending
- Actual cost after response
- Cumulative session costs
- Cost comparison between models
