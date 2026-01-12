/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Modo oscuro por defecto del sistema
  darkMode: 'media',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // 2. Paleta de colores única
      colors: {
        primary: {
          DEFAULT: '#581056',
          dark: '#370936',
        },
        secondary: '#000000',
        background: '#FFFFFF',
        warning: '#C62828',
        muted: '#9CA3AF',
      },
      // 3. Tipografía única
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      // 4. Tamaños de texto únicos
      fontSize: {
        title: ['20px', { lineHeight: '28px', fontWeight: '700' }],
        subtitle: ['18px', { lineHeight: '24px', fontWeight: '500' }],
        body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
