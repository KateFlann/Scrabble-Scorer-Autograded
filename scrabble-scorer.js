// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question(
    "Let's play some scrabble! \n Enter a word to score: "
  );
  return word;
}

let vowelPointStructure = {
  3: ["A", "E", "I", "O", "U"],
  1: [
    "D",
    "G",
    "L",
    "N",
    "R",
    "S",
    "T",
    "B",
    "C",
    "M",
    "P",
    "F",
    "H",
    "V",
    "W",
    "Y",
    "K",
    "J",
    "X",
    "Q",
    "Z",
  ],
};

// let newPointStructure = {
//   A: 1,
//   B: 3,
//   C: 3,
//   D: 2,
//   E: 1,
//   F: 4,
//   G: 2,
//   H: 4,
//   I: 1,
//   J: 8,
//   K: 5,
//   L: 1,
//   M: 3,
//   N: 1,
//   O: 1,
//   P: 3,
//   Q: 10,
//   R: 1,
//   S: 1,
//   T: 1,
//   U: 1,
//   V: 4,
//   W: 4,
//   X: 8,
//   Y: 4,
//   Z: 10,
// };

function simpleScorer(input1) {
  let simpleScore = input1.length;
  return simpleScore;
}

let vowels = ["A", "E", "I", "O", "U"];

function vowelBonusScorer(input2) {
  let vowelBonusWord = input2.toUpperCase();
  let score = 0;
  //   let letterPoints = "";

  //   for (let i = 0; i < vowelBonusWord.length; i++) {
  //     for (const pointValue in vowelPointStructure) {
  //       if (vowelPointStructure[pointValue].includes(vowelBonusWord[i])) {
  //         letterPoints += `Points for '${vowelBonusWord[i]}': ${pointValue}\n`;
  //       }
  //     }
  //   }
  //   return letterPoints;
  for (i = 0; i < vowelBonusWord.length; i++) {
    for (j = 0; j < vowels.length; j++) {
      if (vowels[j] === vowelBonusWord[i]) {
        score += 2;
      }
    }
    score++;
  }
  return score;
}

function transform(object) {
  let obj = {};
  for (item in object) {
    for (i = 0; i < object[item].length; i++) {
      let lowercase = object[item][i].toLowerCase();
      obj[lowercase] = Number(item);
    }
  }
  return obj;
}
let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    let points = newPointStructure[word[i]];
    letterPoints += points;
  }
  return letterPoints;
}

// scoringAlgorithms.push(input)

const scoringAlgorithms = [
  {
    Name: "Simple Score",
    Description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },

  {
    Name: "Bonus Vowels",
    Description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },

  {
    Name: "Scrabble",
    Description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt(word) {
  let scorerSelection;
  while (
    scorerSelection !== 0 &&
    scorerSelection !== 1 &&
    scorerSelection !== 2
  ) {
    scorerSelection = Number(
      input.question(`
         Which scoring algorithm would you like to use?

      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system.
      
      Enter 0, 1, or 2: `)
    );
    if (
      scorerSelection !== 0 &&
      scorerSelection !== 1 &&
      scorerSelection !== 2
    ) {
      console.log(`That's not an option!`);
    }
  }
  console.log(
    `Score for ${word}: ${scoringAlgorithms[scorerSelection].scorerFunction(
      word
    )}`
  );
}

// newPointStructure = transform(oldPointStructure)

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
