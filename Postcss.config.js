// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.ts', // explicitly point to your TS config
    },
    autoprefixer: {},
  },
};