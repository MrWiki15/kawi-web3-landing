# Kawi BRL to USDC Settlement Engine

Landing page for Kawi's hybrid settlement engine for automatic, programmable BRL to USDC liquidation.

## Scripts
.
```bash
npm run dev
npm run build
npm run preview
```

## Live Motor Metrics

The Real Impact section reads Kawi Motor stats from a public read-only stats URL when configured:

```bash
VITE_KAWI_MOTOR_STATS_URL=https://your-public-stats-proxy.example.com/api/platform/stats
VITE_KAWI_MOTOR_BASE_URL=https://mainnet.kawiservices.com
```

`VITE_KAWI_MOTOR_API_KEY` is also supported for controlled environments, but Vite exposes it to the browser. Do not use a privileged production key in this client-only landing. If no live stats source is present, the landing uses the current public fallback numbers.
