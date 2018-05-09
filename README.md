# calc-lang
Calculator interpreter language.

## Installation
```
npm install --save calc-lang
```

## Examples
```js
const Interpreter = require('calc-lang');

const interpreter = new Interpreter();
interpreter.run('jonny what is 13 * 37?');
interpreter.run('((1 + (2 * 3)) * 4) / 2');
```
