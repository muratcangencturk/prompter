import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./*.html', './**/*.html', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
