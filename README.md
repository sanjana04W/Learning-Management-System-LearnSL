# LearnSL 🇱🇰 📚
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


## Categories

| Category | Description |
|---|---|
| O/L Preparation | National exam prep for Grade 11 students |
| A/L Preparation | National exam prep for Grade 13 students |
| Information Technology | Programming, web development, and tech skills |
| Agriculture | Farming, agri-tech, and rural development |
| Business | Entrepreneurship, finance, and management |
| Languages | Sinhala, Tamil, English language learning |
| Vocational Training | Trade skills and professional certifications |

## Filtering & Search

- **Search** — real-time match against course title, description, and instructor name
- **Category filter** — filter by any of the 7 categories; "All Categories" resets
- **Language filter** — Sinhala / Tamil / English / All Languages
- **Sort** — Newest First · Most Popular · Highest Rated · Price Low→High / High→Low
- **No results state** — friendly message with suggestion to adjust filters
  
## Tech Stack
- React 18
- Vite 5
- CSS Modules (plain CSS per component)
- Google Fonts: Playfair Display + DM Sans
- No external UI libraries

## Current Scope & Limitations

- Front-end prototype only — all data is sourced from `courses.js`
- No backend, database, or REST API in this release
- No real payment gateway (enrollment button is UI-only)
- User session state is in React component state (no persistent storage)
- Sinhala / Tamil UI localization planned for a future phase

## Future Enhancements

- Backend API integration (Node.js / Express or Next.js)
- MongoDB database for users, courses, and enrollments
- Real payment gateway (LKR pricing with local providers)
- Video streaming for course lessons
- Admin panel for course and user management
- Full Sinhala and Tamil UI localization
- Email notifications and certificates
