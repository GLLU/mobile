module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "extends": ["airbnb", "plugin:flowtype/recommended"],
    "plugins": [
        "react",
        "standard",
        "promise",
        "babel",
        "flowtype",
        "jest"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest/globals": true
    },
    "globals": {"Promise": true},
    "rules": {
        "no-plusplus": 0,
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "react/jsx-filename-extension": 0,
        "react/jsx-closing-bracket-location": 0,
        "react/prefer-stateless-function": 0,
        "react/require-default-props": 0,
        "react/sort-comp": 0,
        "react/no-string-refs": 0,
        "react/forbid-prop-types": 0,
        "import/prefer-default-export": 0,
        "global-require": 0,
        "no-else-return": 0,
        "class-methods-use-this": 0,
        "no-underscore-dangle": 0,
        "flowtype/no-dupe-keys": 2,
        "no-shadow": ["warn"],
        "no-use-before-define": ["warn"],
        "max-len": ["error",
            {
                "code": 160
            }],
        "no-unused-vars": [
            "warn",
            {
                "vars": "local",
                "args": "after-used",
                "varsIgnorePattern": "React",
                "ignoreRestSiblings": false
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "flowtype/define-flow-type": 1,
        "flowtype/no-primitive-constructor-types": 2,
        "flowtype/no-weak-types": [2, {
            "any": false,
            "Object": true,
            "Function": true
        }],
        "flowtype/require-return-type": [
            2,
            "always",
            {
                "annotateUndefined": "never",
                "excludeArrowFunctions": true
            }
        ],
        "flowtype/object-type-delimiter": [
            2,
            "comma"
        ],
        "flowtype/delimiter-dangle": [
            2,
            "never"
        ],
        "flowtype/generic-spacing": [
            2,
            "never"
        ],
        "flowtype/require-parameter-type": [
            2,
            {
                "excludeArrowFunctions": true
            }
        ],
        "flowtype/no-types-missing-file-annotation": 2,
        "flowtype/semi": [
            2,
            "always"
        ],
        "flowtype/boolean-style": [
            2,
            "boolean"
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/space-before-generic-bracket": [
            2,
            "never"
        ],
        "flowtype/space-before-type-colon": [
            2,
            "never"
        ],
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]+)+Type$"
        ],
        "flowtype/union-intersection-spacing": [
            2,
            "always"
        ],
        "flowtype/use-flow-type": 1,
        "flowtype/valid-syntax": 1
    }
}
