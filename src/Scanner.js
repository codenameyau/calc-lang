const Token = require('./Token').Token;

class Scanner {
  constructor() {
    this.tokens = [];
    this.index = 0;
    this.current_number = '';
  }

  reset() {
    this.tokens = [];
    this.index = 0;
    this.current_number = '';
  }

  scan(text) {
    this.reset();

    const cleanedText = this._clean(text);
    for (this.index = 0; this.index < cleanedText.length; this.index++) {
      this._analyzeToken(cleanedText[this.index]);
    }

    this._pushNumber();
    this.tokens.push(new Token('EOF', 'TK_EOF'))
    return this.tokens;
  }

  _clean(text) {
    return text.toLowerCase().replace(/require|eval/g, '').trim();
  }

  _pushNumber() {
    if (this.current_number) {
      this.tokens.push(new Token(parseFloat(this.current_number), 'TK_NUMBER'));
      this.current_number = '';
    }
  }

  _analyzeToken(char) {
    this._matchNumber(char) ? this._handleNumber(char) :
    this._matchDecimalPoint(char) ? this._handleDecimalPoint(char) :
    this._matchPlus(char) ? this._handleOperator(char, 'TK_PLUS') :
    this._matchMinus(char) ? this._handleOperator(char, 'TK_MINUS') :
    this._matchMultiply(char) ? this._handleOperator(char, 'TK_MULTIPLY') :
    this._matchDivide(char) ? this._handleOperator(char, 'TK_DIVIDE') :
    this._matchModulo(char) ? this._handleOperator(char, 'TK_MOD') :
    this._matchPower(char) ? this._handleOperator(char, 'TK_POWER') :
    this._matchOpenParenthesis(char) ? this._handleOperator(char, 'TK_OPEN_PAREN') :
    this._matchCloseParenthesis(char) ? this._handleOperator(char, 'TK_CLOSE_PAREN') :
    this._handleOther(char);
  }

  _matchNumber(char) {
    return /[0-9]/.test(char);
  }

  _handleNumber(char) {
    this.current_number += char;
  }

  _matchDecimalPoint(char) {
    return char === '.';
  }

  _handleDecimalPoint(char) {
    const isNewDecimalPoint = this.current_number.indexOf('.') === -1;

    if (isNewDecimalPoint) {
      this.current_number += char;
    } else {
      throw new SyntaxError('. at column ' + (this.index + 1));
    }
  }

  _handleOperator(char, token_type) {
    this._pushNumber();
    this.tokens.push(new Token(char, token_type));
  }

  _matchPlus(char) {
    return char === '+';
  }

  _matchMinus(char) {
    return char === '-';
  }

  _matchMultiply(char) {
    return (
      char === '*' || char === 'x'
    );
  }

  _matchDivide(char) {
    return char === '/';
  }

  _matchModulo(char) {
    return char === '%';
  }

  _matchPower(char) {
    return char === '^';
  }

  _matchOpenParenthesis(char) {
    return char === '(';
  }

  _matchCloseParenthesis(char) {
    return char === ')';
  }

  _handleOther(char) {

  }
}

module.exports = Scanner;
