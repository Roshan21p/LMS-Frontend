/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    button: {
      padding: '0' // Customize default button padding here
    }
  },
  plugins: [daisyui, lineClamp],
  daisyui: {
    themes: ['dark'], // Include both light and dark themes
    darkTheme: 'dark' // Set "dark" as the default dark theme
  }
};
