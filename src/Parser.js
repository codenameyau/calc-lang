// Precedence is based on this order of operations:
// https://en.wikipedia.org/wiki/Order_of_operations#Programming_languages
'use strict';

const Scanner = require('./Scanner');

const ERRORS = {
  parseError: {
    code: 'parse_error',
    text: (value, column) => `Could not parse '${value}' at column ${column + 1}.`
  }
};

const PRECEDENCE = {
  LOW: {
    TK_PLUS: 1,
    TK_MINUS: 1,
  },
  HIGH: {
    TK_MULTIPLY: 1,
    TK_DIVIDE: 1,
    TK_MOD: 1,
  },
  UNARY: {
    TK_MINUS: 1,
    TK_NOT: 1
  },
  LITERAL: {
    TK_NUMBER: 1
  },
};

class Parser {
  constructor() {
    this.scanner = new Scanner();
    this.instructions = [];
    this.index = 0;
  }

  reset() {
    this.scanner.reset();
    this.instructions = [];
    this.index = 0;
  }

  parse(text) {
    this.reset();
    this.scanner.scan(text);
    this._parseTokens();
    return this.instructions;
  }

  get currentToken() {
    return this.scanner.tokens[this.index];
  }

  _matchToken(tokenType) {
    if (this.currentToken.type !== tokenType) {
      throw new SyntaxError(ERRORS.parseError.text(this.currentToken.value, this.index));
    }

    this._nextToken();
  }

  _nextToken() {
    this.index += 1;
  }

  _parseTokens() {
    while (this.currentToken && this.currentToken.type !== 'TK_EOF') {
      this._expression();
      this._nextToken();
    }
  }

  _expression() {
    this._term()

    while (PRECEDENCE.LOW[this.currentToken.type]) {
      const operator = this.currentToken;
      this._matchToken(operator.type);
      this._term();

      switch (operator.type) {
        case 'TK_PLUS':
          this._generateInstruction(operator, 'OP_ADD'); break;
        case 'TK_MINUS':
          this._generateInstruction(operator, 'OP_SUBTRACT'); break;
      }
    }
  }

  _term() {
    this._factor();

    while (PRECEDENCE.HIGH[this.currentToken.type]) {
      const operator = this.currentToken;
      this._matchToken(operator.type);
      this._factor();

      switch (operator.type) {
        case 'TK_MULTIPLY':
          this._generateInstruction(operator, 'OP_MULTIPLY'); break;
        case 'TK_DIVIDE':
          this._generateInstruction(operator, 'OP_DIVIDE'); break;
        case 'TK_MOD':
          this._generateInstruction(operator, 'OP_MOD'); break;
      }
    }
  }

  _factor() {
    const token = this.currentToken;

    if (PRECEDENCE.LITERAL[token.type]) {
      this._matchToken(token.type);
      this._generateInstruction(token, 'OP_PUSH');
    }

    else if (PRECEDENCE.UNARY[token.type]) {
      this._matchToken(token.type);
      this._factor();

      switch (token.type) {
        case 'TK_MINUS':
          this._generateInstruction(token, 'OP_NEGATIVE'); break;
        case 'TK_NOT':
          this._generateInstruction(token, 'OP_NEGATE'); break;
      }
    }

    else if (token.type === 'TK_OPEN_PAREN') {
      this._matchToken('TK_OPEN_PAREN');
      this._expression();
      this._matchToken('TK_CLOSE_PAREN');
    }
  }

  _generateInstruction(token, operation) {
    operation && token.setOperation(operation);
    this.instructions.push(token);
  }
}

module.exports = Parser;
