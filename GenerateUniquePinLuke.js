/* const existingPins = ["123456", "234567", "345678", "456789", "567890"];
 */
function generateUniquePin(existingPins) {
  const generateRandomNum = () => Math.floor(100000 + Math.random() * 900000);

  let pinCode = generateRandomNum();
  let attempts = 0;

  while (
    (hasDuplicateDigits(pinCode) ||
      existingPins.includes(pinCode.toString()) ||
      isSequentialNumber(pinCode)) &&
    attempts < 10000
  ) {
    pinCode = generateRandomNum();
    attempts++;
  }

  if (attempts === 10000) {
    throw new Error("Could not generate a unique pin");
  }

  return pinCode;
}

function hasDuplicateDigits(code) {
  // returns true if the code has duplicate digits
  const digits = code.toString().split("");
  return new Set(digits).size !== digits.length;
}

function isSequentialNumber(code) {
  const digits = code.toString().split("").map(Number); // convert digits to numbers
  return digits.slice(1).every((digit, index) => {
    return digit === digits[index] + 1 || digit === digits[index] - 1;
  });
}

/* function generateUniquePinTest() {
  for (let i = 0; i < 100; i++) {
    const newPin = generateUniquePin(existingPins);

    if (existingPins.includes(newPin.toString())) {
      console.log(`duplicate found! ${newPin}`);
      return;
    }

    existingPins.push(newPin.toString());
    console.log(newPin);
  }

  console.log("No duplicates found!");
}

generateUniquePinTest(); */

export default generateUniquePin;
