/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#043867',
        'light_blue':'#2490eb',
        'text_color':'#323232',
        'custom_gray':'#ededed',
      }
    },
  },
  plugins: [],
}