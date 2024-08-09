import { formatCurrency } from '../scripts/utils/money.js';

console.log('Test suite: format currency')
testFormatCurrency(2640, '26.40', "Conver cents into dollars");
testFormatCurrency(0, '0.00', 'works with 0');
testFormatCurrency(3000.5, '30.01', 'Round up to the nearest cent');
testFormatCurrency(3000.4, '30.00', 'Round dwon to the nearest cent');
console.log('Ends test suite: format currency')

function testFormatCurrency(amount, expectedResult, testName) {
  console.log(testName);
  if(formatCurrency(amount) === expectedResult)
    console.log("Passed");
  else
    console.log("Failed");
}