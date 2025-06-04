/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A237E',
          DEFAULT: '#3949AB',
          light: '#7986CB',
        },
        accent: {
          DEFAULT: '#FFC107',
        },
        success: {
          DEFAULT: '#4CAF50',
        },
        error: {
          DEFAULT: '#F44336',
        },
        neutral: {
          dark: '#212121',
          DEFAULT: '#757575',
          light: '#EEEEEE',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
