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

/**
 * @description get image name from Firebase Storage url
 * @param {String} imgUrl
 * @returns {String} image name
 */
const getImageName = (imgUrl) => {
  if (!imgUrl) return "";
  let imageName;
  if (imgUrl.split("images%2F").length > 1) {
    imageName = imgUrl.split("images%2F")[1].split("?alt=")[0];
    const uuidLength = 36;
    imageName = imageName.substr(0, imageName.length - uuidLength - 1);
  } else {
    imageName = imgUrl;
  }

  return imageName;
};

/**
 * @param {Array<String>} storageImageNames
 * @param {String} userId
 * @param {Object} images
 * @returns {Array}
 */
const filterUnsavedImages = (storageImageNames, userId, images) => {
  return [...images].filter(
    (image) => !storageImageNames.includes(`${userId}-${image.name}`)
  );
};

export { formatPrice, getImageName, filterUnsavedImages };
