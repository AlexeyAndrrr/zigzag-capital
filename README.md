# Zigzag Capital

The kinetic landing page for **Zigzag Capital**, an incubation fund working
across advisory, investment, and networking.

The experience is built around one continuous “living zigzag”: it begins as the
brand mark, follows pointer movement, responds to scroll velocity, connects
selected collaborations, and resolves into the closing call to action.

## Highlights

- Pointer-reactive canvas signal and ambient coordinate grid
- Scroll-driven composition, progress, and chapter transitions
- Advisory, investment, and networking narrative
- Verified brand assets for selected teams and ecosystems
- Responsive layouts for desktop, tablet, and mobile
- Keyboard focus states and reduced-motion fallbacks

## Selected collaborations

- Official Trump
- World Liberty Financial
- Virtuals ecosystem
- Peanut the Squirrel
- DAOS.FUN

All third-party names and marks belong to their respective owners.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

## Stack

- React 19
- Next.js-compatible App Router
- vinext and Vite
- Cloudflare Worker-compatible output
- TypeScript and CSS
