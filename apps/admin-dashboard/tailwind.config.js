/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFF7ED',      // light orange background
        surface: '#FFFFFF',         // cards
        primary: '#FB923C',         // orange-400
        primaryDark: '#F97316',     // orange-500
        textPrimary: '#1F2937',     // gray-800
        textMuted: '#6B7280',       // gray-500
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
      },
    },
  },
  plugins: [],
};
