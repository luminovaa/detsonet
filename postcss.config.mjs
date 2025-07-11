/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // Optional: specify your Tailwind config path if not in root
      config: './tailwind.config.ts'
    },
    autoprefixer: {}, // This should typically be included
  }
};

export default config;