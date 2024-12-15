/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens:{
      sm:"488px",
      md:"768px",
      lg:"1024px"
    },
    extend: {
      colors: {
         primaryColor: "#228B22",
         primaryColorLight: "#1e3133",
         secondaryColor: "#F8F8F8",
         paragraphColor: "#888",
         whiteColor: "#2C3E50"
      },
    },
    container: {
      center: true,
      padding:{
        DEFAULT:"1rem",
        sm: "1.5rem"
      }
    }
  },
  plugins: [],
};
