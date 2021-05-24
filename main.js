"use strict";

const assert = require("assert");
const readline = require("readline");
const { start } = require("repl");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [], // 1 2
  c: [],
};
const winCondition = JSON.stringify(stacks.a);

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // use array methods to move a number from one array to the next
  let start = stacks[startStack].pop();
  stacks[endStack].push(start);
};

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // if statement to check if the piece being moved can go where the player is trying to place it.
  const start = stacks[startStack];
  const end = stacks[endStack];
  if (start.length === 0) {
    return false;
  } else if (end.length === 0) {
    return true;
  } else if (start[start.length - 1] < end[end.length - 1]) {
    return true;
  }

  return false;
};

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // another if statement checking if tower that the pieces did not start on has the pieces in the correct order
  for (const key in stacks) {
    if (JSON.stringify(stacks[key]) === winCondition) {
      return true;
    }
  }

  return false;
};

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
  }

  return checkForWin();
};

const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
