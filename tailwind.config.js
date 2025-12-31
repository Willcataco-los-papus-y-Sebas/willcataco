/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode controlado por clase (system lo maneja Angular)
  darkMode: 'class',

  // Archivos donde Tailwind buscará clases
  content: [
    './src/**/*.{html,ts,css}',
  ],

  theme: {
    extend: {
      /*
       * 🎨 COLORS — Design Tokens
       * Semánticos, mobile-first, dark mode compatible
       */
      colors: {
        primary: '#581056',
        'primary-dark': '#370936',

        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0F0F0F',
        },

        foreground: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },

        muted: {
          DEFAULT: '#6B7280',
          dark: '#9CA3AF',
        },

        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
      },

      /*
       * 🔤 TYPOGRAPHY
       * Mobile-first
       */
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },

      /*
       * 🔲 BORDERS
       * Mobile friendly
       */
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },

  plugins: [],
};
