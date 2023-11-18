const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // 设置包含workspace中的packages
    `../../packages/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
