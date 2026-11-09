const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const status = document.getElementById("status");

async function convertCurrency() {
  const value = Number(amount.value);

  if (!Number.isFinite(value) || value <= 0) {
    status.textContent = "Enter a valid amount.";
    return;
  }

  if (from.value === to.value) {
    result.textContent = value.toFixed(2) + " " + to.value;
    status.textContent = "Same currency.";
    return;
  }

  status.textContent = "Getting latest exchange rate...";
  result.textContent = "";

  try {
    const url = `https://api.frankfurter.app/latest?amount=${value}&from=${from.value}&to=${to.value}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Rate unavailable");

    const data = await response.json();
    const converted = data.rates[to.value];

    result.textContent =
      `${converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} ${to.value}`;

    status.textContent = `Rate date: ${data.date}`;
  } catch (error) {
    status.textContent =
      "Could not load rates. Check your internet connection.";
  }
}

document.getElementById("convert")
  .addEventListener("click", convertCurrency);

document.getElementById("swap").addEventListener("click", () => {
  const oldFrom = from.value;
  from.value = to.value;
  to.value = oldFrom;
  convertCurrency();
});

convertCurrency();