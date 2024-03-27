module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'eol-last': 'off', // 文件的末位必须保留一个空行
    'comma-dangle': 'off', // 对象或数组的末位，不允许竖线多余的逗号
    // semi: ['error', 'always'], // 语句末尾分号 错误级 总是使用分号
    semi: 'off',
    indent: 'off', // 缩进检查
    camelcase: 'off', // 关闭驼峰命名检查
    'space-before-function-paren': 'off', // 函数前空格检查
  }
};