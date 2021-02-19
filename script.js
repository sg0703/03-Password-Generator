// Activate password generator when button is clicked
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

// Gathers user selections, generates random password, writes to page. Relies on functions below. 
function writePassword() {
  // Get user to define length
  var charLength = getCharLength();

  // Prompt user for password options and verify all input
  var charOptions = gatherOptions();
  
  // Generate the password given above criteria
  var password = generatePassword(charLength,charOptions);
  
  // Write password to page so it's visible to user
  var passwordText = document.querySelector("#password");
  passwordText.value = password;  
}

// Prompts user for password length and makes sure input is valid
function getCharLength() {
  // Prompt for user input
  var passLength = prompt("How many characters? (Rules: 8-128, must be numbers)");
  // Verify input meets rules, if it does then return value otherwise ask again
  if ((passLength >= 8) && (!isNaN(passLength)) && (passLength <= 128)) {
     return passLength; 
  }
  else {
     return getCharLength();
  }
}

// Relies on getCharOptions to gather user input in an array, and to make sure at least one option overall is chosen by user
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
    return gatherOptions();
  }
  else {
    return passwordComp;
  }
}

// Prompts user for input and makes sure that input is valid
function getCharOptions(characterType) {
  // Four options: uppercase, lowercase, numbers, special
  var userChoice = prompt("Do you want to include " + characterType + " in your password? Please answer Y or N.");
  // If they hit cancel, stop recursive calling
  if (!userChoice) {
    return false;
  }
  // if user entered a letter and it equals Y, then stop
  else if (isNaN(userChoice) && (userChoice === "Y")) {
    return true;
  }
  // if user entered letter and it equals N, then stop
  else if (isNaN(userChoice) && (userChoice === "N")) {
    return false;
  }
  // input is wrong, keep asking until it's right or cancelled
  else {
    return getCharOptions(characterType);
  }
}

// Returns random value from a given array
function getRandomValue(charSet) {
    randomChar = charSet[Math.floor(Math.random() * charSet.length)];
    return String(randomChar);
}

// Generate password given password length and character selections
function generatePassword(charLength,charOptions) {
  // set banks of random characters to choose from for each char type
  var numberOptions = [0,1,2,3,4,5,6,7,8,9];
  var lowCaseOptions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var uppCaseOptions = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var specCharOptions = ['!','@','$','%','^','&','*','(',')','+','-','='];

  // genPassword stores randomly generated password
  var genPassword = "";
  var i = 0;

  // variable to make sure all options chosen
  var isCharTypePresent = [false,false,false,false]; 

  // loop through each character in generated password, choose only those options selected by user and add them to the password genPassword
  while (i < charLength) {
    // randomize which data type in whichChar 
    var whichChar = Math.floor(Math.random() * 4);

    // make sure random char type is allowed by user selection, if it is then use getRandomValue to return random character from that bank of chars, add to password
    if ((whichChar === 0) && (charOptions[0])) {
        isCharTypePresent[0] = true;
        genPassword = genPassword.concat(getRandomValue(uppCaseOptions));
        i++;
    }
    else if ((whichChar === 1) && (charOptions[1])) {
        isCharTypePresent[1] = true;
        genPassword = genPassword.concat(getRandomValue(lowCaseOptions));
        i++;
    }
    else if ((whichChar === 2) && (charOptions[2])) {
        isCharTypePresent[2] = true;
        genPassword = genPassword.concat(getRandomValue(numberOptions));
        i++;
    }
    else if ((whichChar === 3) && (charOptions[3])) {
        isCharTypePresent[3] = true;
        genPassword = genPassword.concat(getRandomValue(specCharOptions));
        i++;
    }
  }
  // verify password meets user criteria...if not, generate another one
  if (String(isCharTypePresent) === String(charOptions)) {
    return genPassword;
  }
  else {
    return generatePassword(charLength,charOptions);
  }
}