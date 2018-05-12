# calc-lang
Calculator interpreter language.

## Installation
```
npm install --save calc-lang
```

### Tests
```
sudo npm install -g jest
jest
```

## Examples
```js
const Interpreter = require('calc-lang');

const interpreter = new Interpreter();
console.log(interpreter.run('jonny what is 13 * 37?'));
console.log(interpreter.run('((1 + (2 * 3)) * 4) / 2)');
```

## Supported Operations

- Addition: +
- Subtraction: -
- Multiplication: * or x
- Division: /
- Parenthesis: ()

### To Add
- Exponentiation: ^
- Modulo: %
- Trigonometry: sin, cos, tan
- Logical: true, false, !
- Logical Comparison: <, >, <=, >=, ==, !=

