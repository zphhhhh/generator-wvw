module.exports = {
  extends: [
    "airbnb-base",
    "plugin:vue/essential",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "config/webpack.base.conf.js"
      }
    }
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-param-reassign": 0,
    "func-names": 0,
    "no-plusplus": 0,
    "no-return-assign": 0,
    "prefer-destructuring": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        "UNIQUE",
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "EVENTS",
        "CONTENT"
      ]
    }]
  },
};