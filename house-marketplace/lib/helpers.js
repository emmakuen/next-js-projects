/**
 * @param {String} currencySymbol
 * @param {Number} price
 * @returns {String} formatted price
 */

const formatPrice = (currencySymbol, price) => {
  if (!price) return "";
  return (
    currencySymbol + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

export { formatPrice };
