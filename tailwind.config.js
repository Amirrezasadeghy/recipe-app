/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-custom': 'inset 0 2px 7px rgb(185, 115, 29);'
    },
  },
  variants: {
    extend: {
      placeholder: ['responsive', 'focus'],
    },
  },
  plugins: [],
}
};
