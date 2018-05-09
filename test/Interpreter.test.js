const Interpreter = require('../src/Interpreter');
const Parser = require('../src/Parser');

describe('Interpreter', () => {
  const interpreter = new Interpreter();

  it('should construct an interpreter', () => {
    expect(interpreter.parser).toEqual(new Parser());
    expect(interpreter.input).toEqual('');
    expect(interpreter.index).toEqual(0);
    expect(interpreter.stack).toEqual([]);
  });

  it('should reset the interpreter', () => {
    interpreter.reset();
    expect(interpreter.input).toEqual('');
    expect(interpreter.index).toEqual(0);
    expect(interpreter.stack).toEqual([]);
  });

  it('should run basic literals', () => {
    expect(interpreter.run('-11')).toEqual(-11);
    expect(interpreter.run('-1')).toEqual(-1);
    expect(interpreter.run('0')).toEqual(0);
    expect(interpreter.run('1')).toEqual(1);
    expect(interpreter.run('11')).toEqual(11);
  })

  it('should run basic addition', () => {
    expect(interpreter.run('-1 + -1')).toEqual(-1 + -1);
    expect(interpreter.run('-1 + 1')).toEqual(-1 + 1);
    expect(interpreter.run('-1.5 + 1')).toEqual(-1.5 + 1);
    expect(interpreter.run('0 + 0')).toEqual(0 + 0);
    expect(interpreter.run('1.5 + 1')).toEqual(1.5 + 1);
    expect(interpreter.run('1 + 1')).toEqual(1 + 1);
  });

  it('should run basic subtraction', () => {
    expect(interpreter.run('-1 - -1')).toEqual(-1 - -1);
    expect(interpreter.run('-1 - 1')).toEqual(-1 - 1);
    expect(interpreter.run('-1.5 - 1')).toEqual(-1.5 - 1);
    expect(interpreter.run('0 - 0')).toEqual(0 - 0);
    expect(interpreter.run('1.5 - 1')).toEqual(1.5 - 1);
    expect(interpreter.run('1 - 1')).toEqual(1 - 1);
  });

  it('should run basic multiplication', () => {
    expect(interpreter.run('-1 * -1')).toEqual(-1 * -1);
    expect(interpreter.run('-1 * 1')).toEqual(-1 * 1);
    expect(interpreter.run('-1.5 * 1')).toEqual(-1.5 * 1);
    expect(interpreter.run('0 * 0')).toEqual(0 * 0);
    expect(interpreter.run('1.5 * 1')).toEqual(1.5 * 1);
    expect(interpreter.run('1 * 1')).toEqual(1 * 1);
  });

  it('should run basic multiplication with x symbol', () => {
    expect(interpreter.run('-1 x -1')).toEqual(-1 * -1);
    expect(interpreter.run('-1 x 1')).toEqual(-1 * 1);
    expect(interpreter.run('-1.5 x 1')).toEqual(-1.5 * 1);
    expect(interpreter.run('0 x 0')).toEqual(0 * 0);
    expect(interpreter.run('1.5 x 1')).toEqual(1.5 * 1);
    expect(interpreter.run('1 x 1')).toEqual(1 * 1);
  });

  it('should run basic division', () => {
    expect(interpreter.run('-1 / -1')).toEqual(-1 / -1);
    expect(interpreter.run('-1 / 1')).toEqual(-1 / 1);
    expect(interpreter.run('-1.5 / 1')).toEqual(-1.5 / 1);
    expect(interpreter.run('0 / 0')).toEqual(0 / 0);
    expect(interpreter.run('1.5 / 1')).toEqual(1.5 / 1);
    expect(interpreter.run('1 / 1')).toEqual(1 / 1);
  });

  it('should run parenthesis', () => {
    expect(interpreter.run('(1 + 2)')).toEqual((1 + 2));
    expect(interpreter.run('(1 + 2) * 3')).toEqual((1 + 2) * 3);
    expect(interpreter.run('3 * (1 + 2)')).toEqual(3 * (1 + 2));
    expect(interpreter.run('(1 + (2 * 3)) * 4')).toEqual((1 + (2 * 3)) * 4);
    expect(interpreter.run('((1 + (2 * 3)) * 4) / 2')).toEqual(((1 + (2 * 3)) * 4) / 2);
  });

  it('should ignore non-sense', () => {
    expect(interpreter.run('johnny what is 13 * 37?')).toEqual((13 * 37));
    expect(interpreter.run('johnny what is 13 (let me think..) * OH I NKOW 37?')).toEqual((13 * 37));
  });

});
