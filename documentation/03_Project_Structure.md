# Project Structure

The project follows a standard modern React application structure using Vite.

## Directory Layout

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and global static files
│   ├── components/      # React components
│   │   ├── ui/          # Reusable, generic UI components (Button, Input, etc.)
│   │   ├── Login.tsx    # Login specific component
│   │   └── Register.tsx # Registration specific component
│   ├── pages/           # Page components (Routes)
│   ├── App.tsx          # Main application component and Routing
│   ├── index.css        # Global styles and Tailwind directives
│   └── main.tsx         # Application entry point
├── .gitignore           # Git ignore rules
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Key Files

- **`src/main.tsx`**: Bootstraps the React application into the DOM.
- **`src/App.tsx`**: Defines the main routes and layout structure.
- **`tailwind.config.js`**: Contains the custom color palette and theme extensions.
- **`src/components/ui/`**: Contains the design system's atomic components.
