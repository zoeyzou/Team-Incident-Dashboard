# Team Incident Dashboard

A modern React + TypeScript dashboard for managing team incidents with real-time updates, optimistic mutations, and full accessibility.

## ✨ Features

- RTK Query - Type-safe API layer with optimistic updates & caching

- React Router - Client-side navigation

- Tailwind CSS - Utility-first styling

- Vitest + RTL - 100% test coverage with accessibility

- Accessible Components - WCAG 2.1 AA compliant

- Modern UX - Loading states, skeletons, smooth animations

## Demo
```
<video src="https://github.com/user-attachments/assets/125cc3a1-4e3b-4f10-9413-6a536d9a4de1" 
       width="720" 
       height="480" 
       controls 
       preload="metadata" 
       loop>
  Your browser does not support the <code>video</code> tag.
</video>

```


## Project Structure

```
src/
├── api/                         # Mock API with localStorage persistence
│   ├── index.ts                 # API exports
│   ├── mockApi.ts               # API client with simulated delay
│   ├── seedData.ts              # Default data for incidents and users
│   ├── storage.ts               # localStorage persistence layer
│   └── types.ts                 # TypeScript types
├── test/
│   └── setup.ts                 # Test setup
├── ui/                          # ALL reusable UI (primitives + layouts)
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── AppLayout.tsx            # App layouts here
│   └── index.ts
├── features/                    # Business logic + domain UI
│   └── incidents/
│       ├── api.ts
│       ├── ui/
│       │   ├── IncidentCard.tsx  # Domain-specific
│       │   └── IncidentList.tsx
│       └── Incidents.tsx
├── pages/                       # Routing shells (ultra-thin)
│   └── Incidents.tsx
└── store/                       # Redux
    └── index.ts
```

## Future improvement

- Add React Compiler to do performance optimization
- Add better form handling with validation library like React Hook Form or Formik
- Test is not complete, need to add more test cases for components and API
- Accessibility improvements

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173)

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```
