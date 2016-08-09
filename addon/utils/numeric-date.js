function calculateNumericDate(year, month, date, hours, minutes, seconds) {
  return (year || 0) * 10000000000 +
    (month + 1 || 1) * 100000000 +
    (date || 1) * 1000000 +
    (hours || 0) * 10000 +
    (minutes || 0) * 100 +
    (seconds || 0) * 1;
}

export default function () {
  if (arguments[0] instanceof Array) {
    return calculateNumericDate.apply({}, arguments[0]);
  } else if (typeof arguments[0] === "object") {
    throw new Error("Not supported argument type");
  }
  return calculateNumericDate(...arguments);
}
