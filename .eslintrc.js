module.exports = {
  // So parent files don't get applied
  root: true,
  extends: ['boldr', 'boldr/react', 'boldr/flowtype'],
  rules: {
    'max-lines': 0
  }
};
