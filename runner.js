import generateUniquePinLewis from "./generateUniquePin.js";
import generateUniquePinLuke from "./GenerateUniquePinLuke.js";
import generatorJames from "./generatorJames.js";
import generateUniquePinAnthony from "./generateUniquePinAnthony.js";

if (process.argv.length <= 2) {
  throw new Error("Not enough params");
}

let func = null;
if (process.argv[2] == "lewis") {
  func = generateUniquePinLewis;
} else if (process.argv[2] == "luke") {
  func = generateUniquePinLuke;
} else if (process.argv[2] == "james") {
  func = generatorJames;
} else if (process.argv[2] == "anthony") {
  func = generateUniquePinAnthony;
} else {
  throw new Error("Unknown dev");
}

let pins = [];
const pinsArgIndex = process.argv.findIndex((arg) => arg.match(/^pins=/));
if (pinsArgIndex !== -1) {
  const pinsArg = process.argv[pinsArgIndex].split("=", 2)[1];

  if (pinsArg == "existing") {
    pins = [
      "935849",
      "934595",
      "445643",
      "243968",
      "279459",
      "596367",
      "028151",
      "679448",
      "518916",
      "148596",
      "336812",
      "150259",
      "761435",
      "402932",
      "068034",
      "010188",
      "832810",
      "138311",
    ];
  } else if (pinsArg.match(/^(?:\d{6},)*\d{6}$/)) {
    pins = pinsArg.split(",");
  } else {
    throw new Error("Invalid pins param");
  }
}

let times = 1;
const timesArgIndex = process.argv.findIndex((arg) => arg.match(/^times=\d+/));
if (timesArgIndex !== -1) {
  times = parseInt(process.argv[timesArgIndex].split("=", 2)[1], 10);
}

for (let iterator = 0; iterator < times; iterator++) {
  const newPin = func(pins);
  pins.push(newPin);
  console.log(
    process.argv.includes("count") ? `${iterator + 1}: ${newPin}` : newPin
  );
}
