module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=0 --no-ignore'],
  '!(src/**/*.{js,jsx,ts,tsx})': ['prettier --fix --ignore-unknown'],
};
