/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/renderer/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(222 47% 11%)',
        foreground: 'hsl(210 40% 98%)',
        card: 'hsl(217 33% 17%)',
        'card-foreground': 'hsl(210 40% 98%)',
        popover: 'hsl(217 33% 17%)',
        'popover-foreground': 'hsl(210 40% 98%)',
        primary: 'hsl(217 91% 60%)',
        'primary-foreground': 'hsl(222 47% 11%)',
        secondary: 'hsl(217 33% 23%)',
        'secondary-foreground': 'hsl(210 40% 98%)',
        muted: 'hsl(215 25% 27%)',
        'muted-foreground': 'hsl(217 20% 63%)',
        accent: 'hsl(215 25% 27%)',
        'accent-foreground': 'hsl(210 40% 98%)',
        destructive: 'hsl(0 84% 60%)',
        'destructive-foreground': 'hsl(210 40% 98%)',
        border: 'hsl(215 25% 27%)',
        ring: 'hsl(217 91% 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}
