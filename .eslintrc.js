module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},

	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"prettier/prettier": "off",
		"prefer-const": "off",
		"no-this-alias": "off",
		"no-constant-condition": "warn",
		"no-prototype-builtins": "warn",
		"no-irregular-whitespace": "warn",
		"no-case-declarations": "warn",
		"no-empty": "warn",
		// indent: ["warn", "tab"],

		"@typescript-eslint/no-empty-function": "warn",
		"@typescript-eslint/no-array-constructor": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-this-alias": "warn",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/triple-slash-reference": "warn",
		"@typescript-eslint/no-var-requires": "off",

		"vue/multi-word-component-names": "off",
		"vue/comment-directive": "off",
		"vue/no-mutating-props": "off",
		"vue/no-unused-components": "warn",
		"vue/no-use-v-if-with-v-for": "warn",
		"vue/no-unused-vars": "warn",
	},
	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
			env: {
				jest: true,
			},
		},
	],
};
