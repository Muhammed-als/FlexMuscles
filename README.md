# FLEXMUSCLES — Interactive Workout Studio & Exercise Directory

An intuitive, lightweight, and responsive frontend-only workout explorer. Navigate a highly structured, hierarchical directory of muscle groups to discover curated YouTube tutorials, then **add, edit, and delete** your own exercises. Everything is saved locally in your browser.

![FLEXMUSCLES](https://img.shields.io/badge/React-18-22d3ee) ![Vite](https://img.shields.io/badge/Vite-8-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Hierarchical Muscle Directory Tree** — A parent-child navigation system grouping major anatomical targets. You can click a parent group (e.g., **Chest**) to view all related exercises combined, or expand the tree to click a specific sub-region (e.g., **Upper Chest**) for isolated targeting.
- **Dynamic Search & Auto-Expand** — A smart search bar that scans both primary muscle groups and specific sub-regions. When a query matches a nested muscle, its parent group automatically expands to highlight the match, filtering out non-relevant categories.
- **Standardized Equipment Segmenting** — Quick-filter tabs let you instantly drill down your current selection by equipment type: *All, Dumbbells, Barbells, Machines & Cables,* or *Home / Bodyweight*.
- **Strict Selector CRUD** — Create, edit, and delete exercises using a modal interface. Free-text inputs are replaced by a standardized equipment selector dropdown to keep your database organized. 
- **Auto YouTube Parser** — Paste any YouTube URL (watch links, `youtu.be`, Shorts, or embed links) or a raw 11-character video ID, and the application extracts and streams it inline.
- **Local Persistence** — All user-created exercises are preserved in `localStorage`. A **Reset System** button is available to restore the original bundled starter set.
- **Deep Linking** — The URL hash automatically tracks your active target muscle selection (e.g., `#/legs-glutes` or `#/group-Chest`) for easy bookmarking.
- **Polished UI** — Built with dark-mode glassmorphism, smooth Framer Motion transitions, responsive layouts, and active-state glowing borders.

## Muscle Taxonomy

The directory matches your precise custom muscle breakdown:

- **Chest**: Upper Chest, Middle Chest, Lower Chest, Inner Chest
- **Back**: Upper Back, Mid Back, Lats, Lower Back, Rear Delts
- **Shoulders**: Front Delts, Side Delts, Rear Delts
- **Biceps**: Long head, Short head, Brachialis
- **Triceps**: Long head, Medial head, Lateral head
- **Forearms**: Extensors, Flexors, Brachioradialis
- **Core**: Upper Abs, Lower Abs, Obliques
- **Legs**: Quads, Hamstrings, Glutes, Adductors, Calves
- **Neck**: Neck & Stabilizers

## Tech Stack

- React 18 + TypeScript
- Vite 8
- Tailwind CSS 3
- Framer Motion (for smooth layout expansions and UI animations)
- Lucide React (for dashboard icons)

## Getting Started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build