module.exports = {
  // So parent files don't get applied
  root: true,
  extends: [
    'boldr',
    'boldr/react',
    'boldr/flowtype',
    'boldr/import',
    'boldr/promise',
    'boldr/jsx-a11y',
  ],
  rules: {
    'max-lines': 0,
    'getter-return': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/boolean-prop-naming': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react/no-unused-state': 0,
    'no-implicit-coercion': 0,
  },
};
