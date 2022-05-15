const convertToRad = (deg) => {
  const pi = Math.PI;
  return deg * (pi / 180);
};

/**
 * validate coordiantion input
 * @param {number} input
 * @returns
 */
const checkValidity = (input) => {
  if (input === null) {
    return false;
  }
  if (isNaN(input)) {
    return false;
  }
  return true;
};

/**
 * Calculates the linear distance between two coordinate using the haversine formula
 * @param {*} currentLat
 * @param {*} currentLong
 * @param {*} destLat
 * @param {*} destLong
 * @returns distance in km
 */
exports.distanceCalculation = (currentLat, currentLong, destLat, destLong) => {
  if (
    !checkValidity(currentLat) ||
    !checkValidity(currentLong) ||
    !checkValidity(destLat) ||
    !checkValidity(destLong)
  ) {
    const e = {
      message: "Please enter a valid input",
    };
    throw e;
  }
  const earthRadius = 6571; //km
  const x1 = destLat - currentLat;
  const dLat = convertToRad(x1);
  const x2 = destLong - currentLong;
  const dLon = convertToRad(x2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(convertToRad(currentLat)) *
      Math.cos(convertToRad(destLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c;

  return Math.round(d * 10) / 10;
};
