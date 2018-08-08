const input = {
  credit: [{
    name: 'rent',
    value: 708.40,
    shared: true,
  }, {
    name: 'building',
    value: 510,
    shared: true,
  }, {
    name: 'internet',
    value: 219.78,
    shared: true,
  }, {
    name: 'gym',
    value: 85.22,
  }, {
    name: 'car insurance',
    value: 367.34,
    shared: true,
  }],
  debit: [{
    name: 'netflix',
    value: 37.90,
    shared: true,
  }, {
    name: 'power bill',
    value: 0,
    shared: true,
  }, {
    name: 'car debts',
    value: 80,
  }],
};

const reducer = (acc, bill) => ({
  sum: acc.sum + (bill.shared ? bill.value / 2 : bill.value),
  maxLength: bill.name.length > acc.maxLength ? bill.name.length : acc.maxLength,
});
const credit = input.credit.reduce(reducer, { sum: 0, maxLength: 0 });
const debit = input.debit.reduce(reducer, { sum: 0, maxLength: 0 });


// let's pretty print
input.credit.forEach(bill => {
  console.log(`${bill.name} - ${bill.shared ? bill.value / 2 : bill.value }`);
});
console.log(`credit: ${credit.sum}`);
console.log();
input.debit.forEach(bill => {
  console.log(`${bill.name} - (${bill.shared ? bill.value / 2 : bill.value })`);
});
console.log(`debit: (${debit.sum})`);
console.log();
console.log(`total: ${credit.sum - debit.sum}`);