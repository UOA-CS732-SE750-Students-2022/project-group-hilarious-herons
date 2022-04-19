const convertToRad = (deg) => {
  const pi = Math.PI;
  return deg * (pi / 180);
};

const checkValidity = (input) => {
  if (input === null) {
    return false;
  }
  if (isNaN(input)) {
    return false;
  }
  return true;
};

exports.distanceCalculation = (currentLat, currentLong, destLat, destLong) => {
  if (
    !checkValidity(currentLat) ||
    !checkValidity(currentLong) ||
    !checkValidity(destLat) ||
    !checkValidity(destLong)
  ) {
    throw "Please enter a valid input";
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
