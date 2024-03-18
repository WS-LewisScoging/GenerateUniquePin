function generateUniquePin(existingPins) {
  // random 6-digit pin generate
  function generateRandomPin() {
    return Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, 6);
  }

  // Check if a pin is unique among existing pins
  function checkIfUnique(pin, existingPins) {
    return !existingPins.includes(pin);
  }

  let newPin = generateRandomPin();
  let i = 0;
  // if not unique keep looping
  while (!checkIfUnique(newPin, existingPins)) {
    newPin = generateRandomPin();
    i++;
    if (i > 1000) {
      return "error we could not generate Pin";
    }
  }

  return newPin;
}

export default generateUniquePin;
