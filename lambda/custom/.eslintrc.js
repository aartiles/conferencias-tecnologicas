module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'warn',
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "env": {
    "node": true,
    "es6": true    
  },
};