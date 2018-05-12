const TOKEN_TABLE = exports.TOKEN_TABLE = {
  TK_EOF: {
    name: 'EOF',
    type: 'descriptor',
    supported: true,
  },
  TK_NUMBER: {
    name: 'number',
    type: 'data',
    supported: true,
  },
  TK_DOT: {
    name: 'dot',
    type: 'data',
    supported: true,
  },
  TK_OPEN_PAREN: {
    name: 'open_parenthesis',
    type: 'operator',
    supported: true,
  },
  TK_CLOSE_PAREN: {
    name: 'close_parenthesis',
    type: 'operator',
    supported: true,
  },
  TK_POWER: {
    name: 'power',
    type: 'operator',
    supported: false,
  },
  TK_SIN: {
    name: 'sine',
    type: 'function',
    supported: false,
  },
  TK_COS: {
    name: 'cosine',
    type: 'function',
    supported: false,
  },
  TK_TAN: {
    name: 'tan',
    type: 'function',
    supported: false,
  },
  TK_MULTIPLY: {
    name: 'multiply',
    type: 'operator',
    supported: true,
  },
  TK_DIVIDE: {
    name: 'divide',
    type: 'operator',
    supported: true,
  },
  TK_MOD: {
    name: 'modulo',
    type: 'operator',
    supported: false,
  },
  TK_PLUS: {
    name: 'plus',
    type: 'operator',
    supported: true,
  },
  TK_MINUS: {
    name: 'minus',
    type: 'operator',
    supported: true,
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
