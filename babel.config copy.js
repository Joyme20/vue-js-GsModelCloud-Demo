module.exports = {
  presets: [
    // "env",
    "@vue/cli-plugin-babel/preset",
    // ['@vue/app', {
    //   useBuiltIns: "entry", // or "usage"
    //   corejs: 3,
    // }],
    '@vue/babel-preset-jsx',

    // "@babel/typescript"
  ],
  plugins: [
    // "@babel/proposal-class-properties",
    // "@babel/proposal-object-rest-spread"
    // "syntax-dynamic-import"
    ["transform-vue-jsx", {}],
    ["add-module-exports", {}]
  ],


};
