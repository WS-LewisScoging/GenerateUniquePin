function generateUniquePin(existingPins, pinLength = 6) {
  // Generate a new random pin of specified length.
  function generate() {
    const max = parseInt(new String().padStart(pinLength, "9"));
    const newPin = Math.round(Math.random() * max)
      .toString()
      .padStart(pinLength, "0");
    return newPin;
  }

  // This function checks for a numerical sequence of numbers 3 or more characters long.
  function containsSequence(pin) {
    if (
      pin.match(
        /012|123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210/
      )
    ) {
      return true;
    }

    return false;
  }

  // This function checks for any repeating numbers 3 or more characters long.
  function containsRepeating(pin) {
    if (pin.match(/000|111|222|333|444|555|666|777|888|999/)) {
      return true;
    }
    return false;
  }

  // This function checks if the same number has been used 4 or more times across the whole pin.
  function containsMany(pin) {
    if (
      pin.match(
        /(\d*0\d*){4}|(\d*1\d*){4}|(\d*2\d*){4}|(\d*3\d*){4}|(\d*4\d*){4}|(\d*5\d*){4}|(\d*6\d*){4}|(\d*7\d*){4}|(\d*8\d*){4}|(\d*9\d*){4}/
      )
    ) {
      return true;
    }
    return false;
  }

  // This function checks if 3 (testLength) characters from the new pin are present in any existing pin.
  function containsDuplicateSequence(pin) {
    const testLength = 3;
    // Loop through sets of testLength characters in the pin.
    for (let i = 0; i <= pin.length - testLength; i++) {
      const testStr = pin.slice(i, i + testLength);
      // With each test string loop through each existing PIN and see if this sequence exists.
      for (let n = 0; n < existingPins.length; n++) {
        if (existingPins[n].match(testStr)) {
          return true;
        }
      }
    }
    return false;
  }

  // This function checks if the same amount of each number is used in any existing pin.
  function containsSameNumberCounts(pin) {
    const sortPin = (p) =>
      p
        .split("")
        .sort((a, b) => a - b)
        .join("");
    const sortedPin = sortPin(pin);
    for (let i = 0; i < existingPins.length; i++) {
      if (sortedPin == sortPin(existingPins[i])) {
        return true;
      }
    }
    return false;
  }

  // Attempt to generate a pin that does not match any of our testing conditions,
  // limit the number of attempts to avoid any kind of infinite loop.
  const maxAttempts = 1000000;
  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    let newPin = generate();
    if (
      !containsSequence(newPin) &&
      !containsRepeating(newPin) &&
      !containsMany(newPin) &&
      !containsDuplicateSequence(newPin) &&
      !containsSameNumberCounts(newPin)
    ) {
      return newPin;
    }
  }

  throw new Error(`Failed to generate a unique pin in ${maxAttempts} attempts`);
}

export default generateUniquePin;
