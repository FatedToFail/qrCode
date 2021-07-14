const qrCodeGenerator = (config, sale, items, prices, discounts, version) => {
  const generator = getQrGeneratorByVersion(version);
  const dataObj = getDataObjByData(config, sale, items, prices, discounts);
  return generator.map((objKey) => {
    if (typeof objKey === 'string') {
      return dataObj[objKey] || '';
    }
    const itemRes = [];
    for (let i = 0; i < dataObj.saleItemNum; i++) {
      itemRes.push(objKey.map((itemKey) => dataObj.items[i][itemKey] || ''));
    }
    return itemRes;
  }).flat(2).join('|');
};

const getQrGeneratorByVersion = (version) => {  
  let itemGenerator = [];
  
  itemGenerator.push('name');
  itemGenerator.push('index');
  itemGenerator.push('price');
  itemGenerator.push('quantity');
  if (version >= 5) {
    itemGenerator.push('discount');
  }
  
  let generator = [];
  
  generator.push('nameSpace');
  generator.push('command');
  generator.push('cashierNum');
  if (version >= 4) {
    generator.push('cheqNum');
  }
  generator.push('footerNum');
  generator.push('mobil');
  generator.push('email');
  generator.push('id');
  generator.push('saleItemNum');
  generator.push(itemGenerator);
  generator.push('paymentType');

  return generator;
}

const getDataObjByData = (config, sale, items, prices, discounts) => {
  const itemData = sale.itemList.map(({ posProduct, quantity, discount }) => {
    const item = getItemByPosProduct(items, posProduct);
    return {
      name: item.printTitles.hu,
      index: getIndexByConfigSaleAndItem(config, sale, item),
      price: getPriceByPosProductAndSale(prices, posProduct, sale),
      quantity: quantity,
      discount: getDiscount(discounts, discount),
    }
  });

  

  return {
    nameSpace: 'http://www.fiscat.com/AEE',
    command: 'SLD',
    cashierNum: undefined,
    cheqNum: undefined,
    footerNum: undefined,
    mobil: undefined,
    email: undefined,
    id: undefined,
    saleItemNum: sale.itemList.length,
    items: itemData,
    paymentType: getPaymentType(sale.paymentType),
  };
};

const getIndexByConfigSaleAndItem = (config, sale, item) => config.cashRegisterConfig.taxRateButtons.find(({ taxRate }) => getTaxRateByItemAndSale(item, sale) === taxRate).buttonIndex;
const getTaxRateByItemAndSale = (item, sale) => {
  const exception = item.taxValueExceptions.find(({ salePoint }) => sale.salePoint === salePoint);
  if (exception) {
    return exception.values[getPlaceType(sale.placeType)];
  }
  return item.defaultTaxValue[getPlaceType(sale.placeType)];
};
const getPriceByPosProductAndSale = (prices, posProduct, sale) => prices.find((price) => price.posProduct === posProduct).currencies.find(({ name }) => name === sale.currency).value;
const getItemByPosProduct = (items, posProduct) => items.find((item) => item._id === posProduct);

const getDiscount = (discounts, discount) => {
  const discountData = discounts.find(({ _id }) => _id === discount);
  if (discountData) {
    return `M${discountData.value}`;
  }
  return undefined;
}

const getPlaceType = (type) => {
  const placeTypes = {
    'IN-PLACE': 'dinein',
    'TO-GO': 'takeaway',
  };
  return placeTypes[type];
}

const getPaymentType = (type) => {
  const paymentTypes = {
    CASH: 'P',
    CARD: 'N',
  };
  return paymentTypes[type];
};

module.exports = qrCodeGenerator;