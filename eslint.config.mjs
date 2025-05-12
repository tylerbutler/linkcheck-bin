import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				// ...globals.browser,
				...globals.node,
				...globals.mocha,
			},
		},
	},
	{
		// Note: there should be no other properties in this object
		ignores: ["vendor/**", "**/*.d.ts"],
	},
];
