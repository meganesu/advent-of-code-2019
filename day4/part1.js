const minValue = 138241;
const maxValue = 674034;

let validPasswordCount = 0;

const hasDouble = password => {
  const passwordString = password.toString();
  for (let index = 1; index < passwordString.length; index += 1) {
    if (passwordString[index] === passwordString[index - 1]) {
      return true;
    }
  }
  return false;
};

const neverDecreases = password => {
  const passwordString = password.toString();
  for (let index = 1; index < passwordString.length; index += 1) {
    if (passwordString[index] < passwordString[index - 1]) {
      return false;
    }
  }
  return true;
};

for (let password = minValue; password < maxValue; password += 1) {
  if (hasDouble(password) && neverDecreases(password)) {
    validPasswordCount += 1;
  }
}

console.log("Possible passwords:", validPasswordCount);