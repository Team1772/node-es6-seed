exports.modelError = number => (err) => {
  err.number = number ? `.${number}` : '';
  throw err;
};
exports.serviceError = (serviceErrorNumber, err) => {
  if (err.number) {
    err.number = `.${serviceErrorNumber}${err.number}`;
  } else {
    err.number = `.${serviceErrorNumber}`;
  }
  return err;
};
