/**
 * generate a unique pin given and array of pins
 *
 * @param {string[]} existingPins array of currently in use 6 digit pins
 * @returns {string} a 6 digit unique pin
 */
function generateUniquePin(existingPins) {
  let newPin = [];
  for (let digitIndex = 0; digitIndex < 6; digitIndex++) {
    // an array of digits the current one cannot be
    const forbiddenDigits = [];

    const lastDigit = digitIndex !== 0 ? newPin[digitIndex - 1] : null;

    // cannot be the last digit
    forbiddenDigits.push(lastDigit);

    // based on last digit make sure it is not one nearby on either numpad or top numbers
    switch (lastDigit) {
      case 0:
        forbiddenDigits.push(1, 2, 9);
        break;
      case 1:
        forbiddenDigits.push(0, 2, 4);
        break;
      case 2:
        forbiddenDigits.push(0, 1, 3, 5);
        break;
      case 3:
        forbiddenDigits.push(2, 4, 6);
        break;
      case 4:
        forbiddenDigits.push(1, 3, 5, 7);
        break;
      case 5:
        forbiddenDigits.push(2, 4, 6, 8);
        break;
      case 6:
        forbiddenDigits.push(3, 5, 7, 9);
        break;
      case 7:
        forbiddenDigits.push(4, 6, 8);
        break;
      case 8:
        forbiddenDigits.push(5, 7, 9);
        break;
      case 9:
        forbiddenDigits.push(0, 6, 8);
        break;
    }

    // calculate the current frequencies of each digit for the current index and remove forbidden ones
    const digitFrequencies = omitKeys(
      existingPins.reduce(
        (currentDigitFrequencies, pin) => {
          const digit = pin[digitIndex];
          const sum = currentDigitFrequencies[digit] + 1;
          const newDigitFrequencies = omitKeys(currentDigitFrequencies, [
            digit,
          ]);
          newDigitFrequencies[digit] = sum;
          return newDigitFrequencies;
        },
        {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        }
      ),
      forbiddenDigits
    );

    // get all the lowest digit frequencies
    const lowestDigitFrequency = Object.values(digitFrequencies).reduce(
      (currentLowest, digitFrequency) =>
        currentLowest < digitFrequency ? currentLowest : digitFrequency,
      Number.MAX_SAFE_INTEGER
    );
    const lowestDigits = Object.entries(digitFrequencies).filter(
      (entry) => entry[1] == lowestDigitFrequency
    );
    // get a random digit from the ones with the same lowest frequency and push to new pin
    newPin.push(
      lowestDigits[Math.floor(Math.random() * lowestDigits.length)][0]
    );
  }

  newPin = newPin.join("");
  if (existingPins.includes(newPin)) {
    // although pin in the same add it to the list to effect the frequencies of other runs
    newPin = generateUniquePin([...existingPins, newPin]);
  }

  return newPin;
}

/**
 * Omit keys from an object
 *
 * @param {Object} object an object with keys to be excluded
 * @param {array} keys keys to be omitted
 * @returns {Object} clone of object with keys omitted
 */
function omitKeys(object, keys) {
  return Object.fromEntries(
    Object.entries(object).filter((entry) => !keys.includes(entry[0]))
  );
}

export default generateUniquePin;
