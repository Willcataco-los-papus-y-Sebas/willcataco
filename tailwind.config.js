/** @type {import('tailwindcss').Config} */
const COLORS = {
  primary: {
    DEFAULT: '#581056',
    dark: '#6A1B9A',
  },
  secondary: {
    DEFAULT: '#000000',
    dark: '#FFFFFF',
  },
  background: {
    DEFAULT: '#FFFFFF',
    dark: '#101016',
  },
  hover: {
    DEFAULT: '#7A2570',
    dark: '#7E57C2',
  },
  disabled: {
    DEFAULT: '#D0D0D0',
    dark: '#4A4A4A',
  },
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
};

const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
  },
  fontSize: {
    title: ['20px', { lineHeight: '28px', fontWeight: '700' }],
    subtitle: ['18px', { lineHeight: '24px', fontWeight: '500' }],
    body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
  },
};

const CONTENT_PATHS = ['./src/**/*.{html,ts}'];

module.exports = {
  darkMode: 'media',

  content: CONTENT_PATHS,

  theme: {
    extend: {
      colors: COLORS,
      fontFamily: TYPOGRAPHY.fontFamily,
      fontSize: TYPOGRAPHY.fontSize,
    },
  },

  plugins: [],
};
