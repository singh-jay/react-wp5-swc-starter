module.exports = {
  // plugins: [
  //   require('postcss-import'),
  //   require('tailwindcss'),
  //   require('autoprefixer'),
  // ],
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {cssnano: {}} : {}),
  },
};
