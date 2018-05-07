const Parser = require('../src/Parser');
const Scanner = require('../src/Scanner');

describe('Parser', () => {
  const parser = new Parser();

  it('should construct a parser', () => {
    const emptyParser = new Parser();
    expect(emptyParser.scanner).toEqual(new Scanner());
    expect(emptyParser.index).toEqual(0);
    expect(emptyParser.instructions).toEqual([]);
  });

  it('should reset the parser', () => {
    parser.reset();
    expect(parser.index).toEqual(0);
    expect(parser.instructions).toEqual([]);
  });

  it('should parse basic literals', () => {
    expect(parser.parse('-11')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 11 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('-1.5')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1.5 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('-1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('0')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 0 }
    ]);

    expect(parser.parse('1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 }
    ]);

    expect(parser.parse('1.5')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1.5 }
    ]);

    expect(parser.parse('11')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 11 }
    ]);
  })

  it('should parse basic addition', () => {
    expect(parser.parse('-2 + 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" }
    ]);

    expect(parser.parse('2 + 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" }
    ]);

    expect(parser.parse('1 + -2')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" }
    ]);

    expect(parser.parse('1 + 2 + 3')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" }
    ])
  });

  it('should parse basic subtraction', () => {
    expect(parser.parse('-2 - 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_SUBTRACT", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('2 - 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_SUBTRACT", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('1 - -2')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_SUBTRACT", "type": "TK_MINUS", "value": "-" }
    ]);

    expect(parser.parse('1 - 2 - 3')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_SUBTRACT", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_SUBTRACT", "type": "TK_MINUS", "value": "-" }
    ])
  });

  it('should parse basic multiplication', () => {
    expect(parser.parse('-2 * 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);

    expect(parser.parse('2 * 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);

    expect(parser.parse('1 * -2')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);

    expect(parser.parse('1 * 2 * 3')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ])
  });

  it('should parse basic division', () => {
    expect(parser.parse('-2 / 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_DIVIDE", "type": "TK_DIVIDE", "value": "/" }
    ]);

    expect(parser.parse('2 / 1')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_DIVIDE", "type": "TK_DIVIDE", "value": "/" }
    ]);

    expect(parser.parse('1 / -2')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_NEGATIVE", "type": "TK_MINUS", "value": "-" },
      { "operation": "OP_DIVIDE", "type": "TK_DIVIDE", "value": "/" }
    ]);

    expect(parser.parse('1 / 2 / 3')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_DIVIDE", "type": "TK_DIVIDE", "value": "/" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_DIVIDE", "type": "TK_DIVIDE", "value": "/" }
    ]);
  });

  it('should parse parenthesis', () => {
    expect(parser.parse('(1 + 2)')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" }
    ]);

    expect(parser.parse('(1 + 2) * 3')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);

    expect(parser.parse('3 * (1 + 2)')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);

    expect(parser.parse('(1 + (2 * 3)) * 4')).toEqual([
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 1 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 2 },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 3 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" },
      { "operation": "OP_ADD", "type": "TK_PLUS", "value": "+" },
      { "operation": "OP_PUSH", "type": "TK_NUMBER", "value": 4 },
      { "operation": "OP_MULTIPLY", "type": "TK_MULTIPLY", "value": "*" }
    ]);
  });
});
