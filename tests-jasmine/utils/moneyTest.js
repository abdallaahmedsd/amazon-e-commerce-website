import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite: fromatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
  
  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.3)).toEqual('20.00');
  });
});