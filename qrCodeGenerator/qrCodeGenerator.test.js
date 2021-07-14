const testData = require('./testdata.json');
const qrCodeGenerator = require('./qrCodeGenerator');

const { item1, item2, config, discounts, itemPrices, sale1, sale2 } = testData;

test('qr for V5 with cash and no discounts', () => {
  expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 5))
    .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1|||3|1000|2||N');
});
test('qr for V5 with cash and with discounts', () => {
  expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 5))
    .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1|||3|1000|2|M20|P');
});
test('qr for V4 with cash and no discounts', () => {
  expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 4))
    .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1||3|1000|2|N');
});
test('qr for V4 with cash and with discounts', () => {
  expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 4))
    .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1||3|1000|2|P');
});
test('qr for V3 with cash and no discounts', () => {
  expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 3))
    .toBe('http://www.fiscat.com/AEE|SLD||4||||||||2||3|500|1||3|1000|2|N');
});
test('qr for V3 with cash and with discounts', () => {
  expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 3))
    .toBe('http://www.fiscat.com/AEE|SLD||4||||||||2||3|500|1||3|1000|2|P');
});
