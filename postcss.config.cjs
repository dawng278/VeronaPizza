// postcss.config.js hoặc postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- quan trọng, không phải 'tailwindcss' nữa
    autoprefixer: {},
  },
};
