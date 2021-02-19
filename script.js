// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  
  passwordText.value = password;  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword());

// My code for generating password
function generatePassword() {
      // Get user to define length
      var charLength = getCharLength();
      // Prompt user for password options and verify all input
      var charOptions = gatherOptions();
      // Print to console log for debugging purposes/make sure values are passed properly
      console.log("generatePassword() charOptions = " + charOptions);
      console.log("generatePassword() charLength = " + charLength);

      // set banks of random characters to choose from for each char type
      var numberOptions = [0,1,2,3,4,5,6,7,8,9];
      var lowCaseOptions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      var uppCaseOptions = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var specCharOptions = ['!','@','$','%','^','&','*','(',')','+','-','='];

      // set vars outside loop
      var genPassword = "";
      var i = 0;

      // loop through each character in generated password, choose only those options selected by user and add them to the password genPassword
      while (i < charLength) {
        // randomize which data type in whichChar 
        var whichChar = Math.floor(Math.random() * 4);

        // make sure random char type is allowed by user selection, if it is then use getRandomValue to return random character from that bank of chars, add to password
        if ((whichChar === 0) && (charOptions[0])) {
            //console.log(getRandomValue(uppCaseOptions));
            genPassword = genPassword.concat(getRandomValue(uppCaseOptions));
            i++;
        }
        else if ((whichChar === 1) && (charOptions[1])) {
            //console.log(getRandomValue(lowCaseOptions));
            genPassword = genPassword.concat(getRandomValue(lowCaseOptions));
            i++;
        }
        else if ((whichChar === 2) && (charOptions[2])) {
            //console.log(getRandomValue(numberOptions));
            genPassword = genPassword.concat(getRandomValue(numberOptions));
            i++;
        }
        else if ((whichChar === 3) && (charOptions[3])) {
            //console.log(getRandomValue(specCharOptions));
            genPassword = genPassword.concat(getRandomValue(specCharOptions));
            i++;
        }
      }
      return genPassword;
}

// This function prompts user for password length and makes sure input is valid
function getCharLength() {
  // Prompt for user input
  var passLength = prompt("How many characters? (Rules: 8-128, must be numbers)");
  // Verify input meets rules, if it does then return value otherwise ask again
  if ((passLength >= 8) && (!isNaN(passLength)) && (passLength <= 128)) {
     console.log("User wants password " + passLength + " characters long.");
     return passLength; 
  }
  else {
     return getCharLength();
  }
}

// This function prompts user for input and makes sure that input is valid
function getCharOptions(characterType) {
  // Four options: uppercase, lowercase, numbers, special
  var userChoice = prompt("Do you want to include " + characterType + " in your password? Please answer Y or N.");
  // If they hit cancel, stop recursive calling
  if (!userChoice) {
    return false;
  }
  // if user entered a letter and it equals Y, then stop
  else if (isNaN(userChoice) && (userChoice === "Y")) {
    console.log("User DOES want to include " + characterType);
    return true;
  }
  // if user entered letter and it equals N, then stop
  else if (isNaN(userChoice) && (userChoice === "N")) {
    console.log("User DOES NOT want to include " + characterType);
    return false;
  }
  // input is wrong, keep asking until it's right or cancelled
  else {
    return getCharOptions(characterType);
  }
}

// This function relies on getCharOptions to gather user input in an array, and to make sure at least one option overall is chosen by user
function gatherOptions () {
  // prompt user for password composition and dump results into boolean array
  // As listed below: position 0 is UC, 1 is LC, 2 is Numbers, 3 is Specials
  var passwordComp = [getCharOptions("uppercase letters"),getCharOptions("lowercase letters"),getCharOptions("numbers"),getCharOptions("special characters")];

  var optionCount = 0;

  for (i = 0; i < passwordComp.length; i++) {
    if (passwordComp[i]) {
      optionCount++;
    }
  }

  if (optionCount == 0) {
    alert("You must pick at least one option!");
    console.log("gatherptions(): No options were chosen, repeat.");
    return gatherOptions();
  }
  else {
    console.log("gatherOptions(): At least one option was chosen...proceed.");
    return passwordComp;
  }
}

// This function returns random value from a given array
function getRandomValue(charSet) {
    randomChar = charSet[Math.floor(Math.random() * charSet.length)];
    return String(randomChar);
}