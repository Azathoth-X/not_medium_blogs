# Mid-Yum

A minimalist blogging platform built with modern web technologies.

## 🚀 Features

- Clean, responsive user interface
- JWT-based authentication
- Create and read blog posts
- User profiles with avatars

## 💻 Tech Stack

### Frontend
- **React** - UI library
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - For navigation

### Backend
- **Hono** - Lightweight web framework
- **DrizzleORM** - Type-safe ORM
- **JWT** - For secure authentication

## 🌐 Live Demo

Visit the live application at: [midyum.pages.dev](https://midyum.pages.dev)

## 🏗️ Project Structure

```
not_medium_blogs/
├── frontend/         # React frontend application
├── common/           # Common library for types and input validation.
├── backend/          # Hono backend server
└── README.md         # This file
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/not_medium_blogs.git
   cd not_medium_blogs
   ```

2. Install dependencies for frontend and backend
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Run the development servers
   ```bash
   # Frontend
   cd frontend
   npm run dev

   # Backend
   cd ../backend
   npm run dev
   ```
