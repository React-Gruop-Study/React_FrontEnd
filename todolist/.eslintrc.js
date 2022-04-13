module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    // 사용하지 않는 파일이 있어도 구동이 되게함
    'import/no-cycle': 'off',
    // 사용하지 않는 변수가 있어도 구동이 되게함
    'no-unused-vars': 'off',
    // input file태그에 alt가 없어도 동작가능하게 함
    'jsx-a11y/alt-text': 'off',
  },
};
