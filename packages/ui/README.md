# @jcmono/ui

A shared UI component library built with shadcn/ui for the jc-fullstack-mono turborepo.

## Installation

This package is automatically installed when you run `npm install` in the root of the monorepo.

For apps within the monorepo, add it to your `package.json`:

```json
{
  "dependencies": {
    "@jcmono/ui": "*"
  }
}
```

### Import Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@jcmono/ui";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```
### Tailwind Configuration

Make sure your `tailwind.config.js` includes the UI package's source files:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  // ... rest of your config
}
```

## Development

To build the package:

```bash
cd packages/ui
npm run build
```

To watch for changes during development:

```bash
cd packages/ui
npm run dev
```