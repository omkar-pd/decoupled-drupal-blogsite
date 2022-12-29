/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        default: "0px 10px 20px rgba(150, 150, 187, 0.1)",
      },
      fontSize: {
        "2rem": "2rem",
      },
      colors: {
        'regal-blue': '#E9F9FA',
      },
    },
  },
};
