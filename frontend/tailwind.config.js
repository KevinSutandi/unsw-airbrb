/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line quotes
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
