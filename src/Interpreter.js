'use strict';

const Parser = require('./Parser');

const ERRORS = {
  syntaxError: {
    code: 'syntax_error',
    text: (value) => `Could not parse '${value}'.`
  }
};

class Interpreter {

  constructor() {
    this.parser = new Parser();
    this.input = '';
    this.index = 0;
    this.stack = [];

    this.handlers = {
      'OP_PUSH': (instruction) => {
        this.stack.push(instruction);
      },
      'OP_NEGATIVE': () => {
        let token = this.stack.pop();
        token.value = -1 * token.value;
        this.stack.push(token);
      },
      'OP_ADD': () => {
        let tokenA = this.stack.pop();
        let tokenB = this.stack.pop();
        tokenA.value = tokenB.value + tokenA.value;
        this.stack.push(tokenA);
      },
      'OP_SUBTRACT': () => {
        let tokenA = this.stack.pop();
        let tokenB = this.stack.pop();
        tokenA.value = tokenB.value - tokenA.value;
        this.stack.push(tokenA);
      },
      'OP_MULTIPLY': () => {
        let tokenA = this.stack.pop();
        let tokenB = this.stack.pop();
        tokenA.value = tokenB.value * tokenA.value;
        this.stack.push(tokenA);
      },
      'OP_DIVIDE': () => {
        let tokenA = this.stack.pop();
        let tokenB = this.stack.pop();
        tokenA.value = tokenB.value / tokenA.value;
        this.stack.push(tokenA);
      },
    };
  }

  reset() {
    this.parser.reset();
    this.input = '';
    this.index = 0;
    this.stack = [];
  }

  run(text) {
    this.reset();
    const instructions = this.parser.parse(text);
    this.executeInstructions(instructions);
    const output = this.stack.pop();
    return output && output.value;
  }

  executeInstructions(instructions) {
    instructions.forEach((instruction) => {
      const handler = this.handlers[instruction.operation];
      handler && handler(instruction);
    })
  }
}

module.exports = Interpreter;
