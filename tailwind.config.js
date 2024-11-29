/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [daisyui, lineClamp]
};
