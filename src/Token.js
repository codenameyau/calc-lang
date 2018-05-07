const TOKEN_TABLE = exports.TOKEN_TABLE = {
  TK_EOF: {
    name: 'EOF',
    type: 'descriptor'
  },
  TK_NUMBER: {
    name: 'number',
    type: 'data',
  },
  TK_DOT: {
    name: 'dot',
    type: 'data',
  },
  TK_OPEN_PAREN: {
    name: 'open_parenthesis',
    type: 'operator',
  },
  TK_CLOSE_PAREN: {
    name: 'close_parenthesis',
    type: 'operator',
  },
  TK_POWER: {
    name: 'power',
    type: 'operator',
  },
  TK_SIN: {
    name: 'sine',
    type: 'function',
  },
  TK_COS: {
    name: 'cosine',
    type: 'function',
  },
  TK_TAN: {
    name: 'tan',
    type: 'function',
  },
  TK_MULTIPLY: {
    name: 'multiply',
    type: 'operator',
  },
  TK_DIVIDE: {
    name: 'divide',
    type: 'operator',
  },
  TK_MOD: {
    name: 'modulo',
    type: 'operator',
  },
  TK_PLUS: {
    name: 'plus',
    type: 'operator',
  },
  TK_MINUS: {
    name: 'minus',
    type: 'operator',
  },
};

class Token {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }

  get token() {
    return TOKEN_TABLE[this.type];
  }

  setOperation(operation) {
    this.operation = operation;
  }
}

exports.Token = Token;
