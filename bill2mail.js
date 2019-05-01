const input = {
  credit: [{
    name: 'aluguel',
    value: 879.49,
    shared: true,
  }, {
    name: 'condominio',
    value: 510,
    shared: true,
  }, {
    name: 'internet',
    value: 242.57,
    shared: true,
  }, {
    name: 'gym',
    value: 85.22,
  }],
  debit: [{
    name: 'netflix',
    value: 37.90,
    shared: true,
  }, {
    name: 'power bill',
    value: 49.47,
    shared: false,
  }, {
    name: 'cama',
    value: 57.20,
  }, {
    name: 'estacionamento',
    value: 230,
    shared: true,
  }],
};

const CREDIT = '*credit*';
const DEBIT = '*debit*';
const TOTAL = '*total*';
const CURRENCY = 'R$';

const reducer = (acc, bill) => ({
  sum: acc.sum + (bill.shared ? bill.value / 2 : bill.value),
  maxLength: bill.name.length > acc.maxLength ? bill.name.length : acc.maxLength,
});

const prettyLine = (name, value, debit = false, maxLength = 0) => {
  const roundedValue = `${CURRENCY}${Number(value).toFixed(2)}`;
  const valueStr = debit ? `(${roundedValue})` : roundedValue;
  const paddedValue = valueStr.padStart(maxLength - name.length + (debit ? 11 : 10), ' ');
  return `${name} ${paddedValue}`;
}

const prettyBill = (bill, debit = false, maxLength = 0) => (
  prettyLine(bill.name, bill.shared ? bill.value / 2 : bill.value, debit, maxLength)
);

const credit = input.credit.reduce(reducer, { sum: 0, maxLength: 0 });
const debit = input.debit.reduce(reducer, { sum: 0, maxLength: 0 });
const maxLength = credit.maxLength > debit.maxLength ? credit.maxLength : debit.maxLength;

// let's pretty print
input.credit.forEach(bill => { console.log(prettyBill(bill, false, maxLength)); });
console.log(prettyLine(CREDIT, credit.sum, false, maxLength));
console.log();
input.debit.forEach(bill => { console.log(prettyBill(bill, true, maxLength)); });
console.log(prettyLine(DEBIT, debit.sum, true, maxLength));
console.log();
console.log(prettyLine(TOTAL, credit.sum - debit.sum, credit.sum - debit.sum < 0 , maxLength));