# Styling and Theming

The project uses [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling, configured with a custom color palette/theme.

## Configuration (`tailwind.config.js`)

The theme is extended with semantic color names to support theming and consistency.

### Color Palette

| Name | CSS Variable | Usage |
|------|--------------|-------|
| **Primary** | `--color-primary` | Main action buttons, active states. |
| **Secondary** | `--color-secondary` | Secondary actions, highlights. |
| **Accent** | `--color-accent` | subtle highlights, focus rings. |
| **Background** | `--color-background` | Page background. |
| **Surface** | `--color-surface` | Card backgrounds, inputs. |
| **Border** | `--color-border` | Borders, dividers. |
| **Success** | `--color-success` | Success messages, valid states. |
| **Warning** | `--color-warning` | Alerts, attention needed. |
| **Danger** | `--color-danger` | Error states, destructve actions. |

### Text Colors
- **text-primary**: Main content text.
- **text-muted**: Secondary/helper text.

## Usage

Use the utility classes directly in your components:

```tsx
<div className="bg-surface border border-border p-4 rounded-lg">
  <h1 className="text-primary text-xl">Hello World</h1>
  <p className="text-text-muted">This is a description.</p>
</div>
```

## CSS Variables
The actual color values are defined in `src/index.css` (assumed) as CSS variables, allowing for easy runtime theme switching (e.g., Dark Mode) if implemented.
