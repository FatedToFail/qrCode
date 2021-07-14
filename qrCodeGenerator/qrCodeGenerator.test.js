const testData = require('./testdata.json');
const qrCodeGenerator = require('./qrCodeGenerator');

const { item1, item2, config, discounts, itemPrices, sale1, sale2, sale3 } = testData;

describe('qr code for V5', () => {
  test('WITH cash and WITH discounts - 1 item', () => {
    expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 5))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||1||3|1000|2|M20|P');
  });
  test('WITH card and NO discounts - 2 items', () => {
    expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 5))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1|||3|1000|2||N');
  });
  test('WITH card and WITH discounts - 3 items', () => {
    expect(qrCodeGenerator(config, sale3, [item1, item2], itemPrices, discounts, 5))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||3||3|500|1|||3|1000|2|||3|500|3|M20|N');
  });
});
describe('qr code for V4', () => {
  test('WITH cash and WITH discounts - 1 item', () => {
    expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 4))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||1||3|1000|2|P');
  });
  test('WITH card and NO discounts - 2 items', () => {
    expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 4))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||2||3|500|1||3|1000|2|N');
  });
  test('WITH card and WITH discounts - 3 items', () => {
    expect(qrCodeGenerator(config, sale3, [item1, item2], itemPrices, discounts, 4))
      .toBe('http://www.fiscat.com/AEE|SLD|||4||||||||3||3|500|1||3|1000|2||3|500|3|N');
  });
});
describe('qr code for V3', () => {
  test('WITH cash and WITH discounts - 1 item', () => {
    expect(qrCodeGenerator(config, sale1, [item1, item2], itemPrices, discounts, 3))
      .toBe('http://www.fiscat.com/AEE|SLD||4||||||||1||3|1000|2|P');
  });
  test('WITH card and NO discounts - 2 items', () => {
    expect(qrCodeGenerator(config, sale2, [item1, item2], itemPrices, discounts, 3))
      .toBe('http://www.fiscat.com/AEE|SLD||4||||||||2||3|500|1||3|1000|2|N');
  });
  test('WITH card and WITH discounts - 3 items', () => {
    expect(qrCodeGenerator(config, sale3, [item1, item2], itemPrices, discounts, 3))
      .toBe('http://www.fiscat.com/AEE|SLD||4||||||||3||3|500|1||3|1000|2||3|500|3|N');
  });
});
