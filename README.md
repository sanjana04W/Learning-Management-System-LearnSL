# LearnSL 🇱🇰

Sri Lanka's Real-World Learning Management System built with React + Vite.

## Features
- 3-page SPA: Home, All Courses (with categories), Course Detail
- 8 courses across 7 Sri Lankan education categories
- Filter by category, language (Sinhala/Tamil/English), level
- Search & sort functionality
- Grid/List view toggle
- Curriculum accordion, instructor profile, reviews
- LKR pricing with enrol button
- Fully responsive design

## Pages
| Route (simulated) | Description |
|---|---|
| Home (`/`) | Hero, categories, featured courses, testimonials |
| Courses (`/courses`) | All courses with sidebar filters |
| Course Detail (`/courses/:id`) | Full course info, curriculum, enrol |

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Tech Stack
- React 18
- Vite 5
- CSS Modules (plain CSS per component)
- Google Fonts: Playfair Display + DM Sans
- No external UI libraries
