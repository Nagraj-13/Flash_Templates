module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "react-hooks", "jsx-a11y", "import", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "react/prop-types": "off",
        "import/order": ["error", { alphabetize: { order: "asc" } }],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
