const Scanner = require('../src/Scanner');

describe('Scanner', () => {
  const scanner = new Scanner();

  it('should construct a scanner', () => {
    const emptyScanner = new Scanner();
    expect(emptyScanner.tokens).toEqual([]);
    expect(emptyScanner.index).toEqual(0);
    expect(emptyScanner.current_number).toEqual('');
  });

  it('should reset', () => {
    scanner.tokens = [
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ];

    scanner.index = 10;
    scanner.current_number = '3';
    scanner.reset();

    expect(scanner.tokens).toEqual([]);
    expect(scanner.index).toEqual(0);
    expect(scanner.current_number).toEqual('');
  });

  it('should return tokens for basic addition', () => {
    expect(scanner.scan('1+1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic subtraction', () => {
    expect(scanner.scan('1-1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic multiplication', () => {
    expect(scanner.scan('1x1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MULTIPLY", "value": "x" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);

    expect(scanner.scan('1X1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MULTIPLY", "value": "x" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);

    expect(scanner.scan('1*1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MULTIPLY", "value": "*" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic division', () => {
    expect(scanner.scan('1/1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_DIVIDE", "value": "/" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic modulo', () => {
    expect(scanner.scan('1%1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MOD", "value": "%" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic power', () => {
    expect(scanner.scan('1^1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_POWER", "value": "^" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for basic parenthesis', () => {
    expect(scanner.scan('(1 * 1)')).toEqual([
      { "type": "TK_OPEN_PAREN", "value": "(" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MULTIPLY", "value": "*" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_CLOSE_PAREN", "value": ")" },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for negative numbers', () => {
    expect(scanner.scan('-1 - 1')).toEqual([
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);

    expect(scanner.scan('-1 - -1')).toEqual([
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for multiple basic operations', () => {
    expect(scanner.scan('1 + 1 - 1 * 1 / 1')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MULTIPLY", "value": "*" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_DIVIDE", "value": "/" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  })

  it('should return tokens for numbers with multiple digits', () => {
    expect(scanner.scan('11+111')).toEqual([
      { "type": "TK_NUMBER", "value": 11 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 111 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens for real numbers', () => {
    expect(scanner.scan('1.5 + 2.55')).toEqual([
      { "type": "TK_NUMBER", "value": 1.5 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 2.55 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });

  it('should return tokens while ignoring other words', () => {
    expect(scanner.scan('what is 1 + 1 - 1 johnny?')).toEqual([
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_PLUS", "value": "+" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_MINUS", "value": "-" },
      { "type": "TK_NUMBER", "value": 1 },
      { "type": "TK_EOF", "value": "EOF" }
    ]);
  });
});
