import baseConfig from "@jcmono/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
    },
  },
};
