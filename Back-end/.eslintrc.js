module.exports = {
    env: {
        commonjs: true,
        es2021: true,
    },
    plugins: [
        'jsdoc',
        'node',
        'promise',
    ],
    extends: [
        'standard',
        'plugin:jsdoc/recommended',
        'plugin:node/recommended',
        'plugin:promise/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        semi: [2, 'always'],
        'comma-dangle': [2, 'always-multiline'],
        indent: ['error', 4],
    },
};
