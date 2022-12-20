// Author: Connor Tolderlund
// email: connor_tolderlund@student.uml.edu

let tiles_remaining = 93;

// this will represent the piece bag during the game
let working_piece_bag = JSON.parse(JSON.stringify(piece_bag));

// this will hold all the score information about the word
let working_sum = {};

// this will indicate the index of the previous slot a letter was placed in
let last_slot_used = -1;

let letters_on_board = 0;

$(document).ready(() => {
  buildBoard();
  resetGame();
});

// puts a draggable letter into the JQuery object passed in
function generateLetter(rack) {
  let tileGen = Math.floor(Math.random() * tiles_remaining);
  // for each letter in the piece bag, we subtract the number left
  // for each letter from a randomly generated number between
  // [0, num_tiles_remaining], which allows the frequency of
  // character generation to be weighted by for each piece
  for (const letter in pieces_sorted_by_freq) {
    tileGen -= working_piece_bag[letter].amount;
    if (tileGen < 0) {
      // the below condition should be impossible, but just to be sure
      if (letter === "") {
        console.log("Generated string was empty");
        return;
      }

      // using an empty css class to determine if the tile was dropped properly
      let img = $("<img/>");
      img.attr("src", `./content/tiles/Scrabble_Tile_${letter}.jpg`);
      img.attr("tile", String(letter));
      img.addClass("tile");
      img.draggable({
        snap: ".ui-droppable",
        revert: "invalid",
        snapMode: "inner",
      });

      // add the letter to the rack
      rack.append(img);
      // and remove it from the 'piece bag'
      working_piece_bag[letter].amount = working_piece_bag[letter].amount - 1;

      break;
    }
  }
}

// reset all globals to their initial state
function resetState() {
  last_slot_used = -1;
  letters_on_board = 0;
  working_sum = {};
  working_piece_bag = JSON.parse(JSON.stringify(piece_bag));
  tiles_remaining = 93;
  $("#score").text(0);
  $("#tiles-remaining").text(tiles_remaining);
  $("#word").text("N/A");
}

function resetGame() {
  resetRack();
  resetState();
}

/// wipes the rack and re-serves letters
function resetRack() {
  let rack = $("#rack");
  rack.empty();
  rack.droppable({
    drop: function (e, ui) {
      if ($(ui.draggable).hasClass("on-rack")) {
        $(ui.draggable).removeClass("on-rack");
        return;
      }

      // console.log(letters_on_board);

      if (letters_on_board > 0) {
        letters_on_board--;
      }

      $(ui.draggable).addClass("on-rack");

      if ($(ui.draggable).hasClass("on-board")) {
        $(ui.draggable).removeClass("on-board");
      }

      // console.log(letters_on_board);
    },
  });

  // generate 7 letters
  for (let i = 0; i < 7; i++) {
    generateLetter(rack);
  }
}

function processLetterDropOnBoard(e, ui) {
  // get the index of the slot that the piece was dropped on
  let currentLetterIndex = parseInt($(this).attr("id").replace("slot-", ""));

  // determine if it is adjacent to the last slot used
  let isAdjacent =
    currentLetterIndex - 1 === last_slot_used ||
    currentLetterIndex + 1 === last_slot_used;

  // default the behavior to revert on invalid
  $(ui.draggable).draggable("option", "revert", "invalid");

  // revert the tile if it is not adjacent to previous tiles
  if (last_slot_used !== -1 && !isAdjacent && letters_on_board > 0) {
    $(ui.draggable).draggable("option", "revert", true); // addClass("drag-revert");
    return;
  }

  if ($(ui.draggable).hasClass("on-rack")) {
    $(ui.draggable).removeClass("on-rack");
  }

  // if we get here, then the tile was placed in a valid manner
  $(ui.draggable).addClass("on-board");
  letters_on_board++;

  // populate a data structure to help calculate score
  // this will take form: { letter: ['letter', letter_multiplier, word_multiplier] }
  working_sum[parseInt($(this).attr("id").replace("slot-", ""))] = [
    ui.draggable.attr("tile"),
    parseInt($(this).attr("letter-multiplier")),
    parseInt($(this).attr("word-multiplier")),
  ];

  // update the last slot used
  last_slot_used = currentLetterIndex;
}

// builds the slots for the board
function buildBoard() {
  let board = $("#board");
  // make a bunch of divs for the board slots
  for (let i = 0; i < 15; i++) {
    let boardSlot = $("<div></div>");
    boardSlot.css({ width: "66", height: "66", padding: "0" });
    boardSlot.addClass("board-slot");
    boardSlot.attr("id", `slot-${i}`);
    // add appropriate letter/word modifiers
    if (i === 2 || i === 12) {
      // double word score here
      boardSlot.attr("word-multiplier", "2");
      boardSlot.attr("letter-multiplier", "1");
      boardSlot.css({
        "background-image": "url(./content/scrabble_board_tile_dws.jpg)",
      });
    } else if (i === 6 || i === 8) {
      // double letter score here
      boardSlot.attr("letter-multiplier", "2");
      boardSlot.attr("word-multiplier", "1");
      boardSlot.css({
        "background-image": "url(./content/scrabble_board_tile_dls.jpg)",
      });
    } else {
      // regular slot
      boardSlot.attr("letter-multiplier", "1");
      boardSlot.attr("word-multiplier", "1");
      boardSlot.css({
        "background-image": "url(./content/scrabble_board_tile_reg.jpg)",
      });
    }
    boardSlot.droppable({
      drop: processLetterDropOnBoard,
      tolerance: "fit",
    });
    board.append(boardSlot);
  }
}

// gotta check for letters on board
function nextRound() {
  let num_letters_on_board = $(".on-board").length;
  if (num_letters_on_board === 0 || num_letters_on_board === 1) {
    return;
  }

  let word = "";
  let score = 0;
  let wordMultiplier = 1;

  for (const slot in working_sum) {
    let letter = working_sum[slot][0];
    if (letter === "BLANK") {
      // we will use a hyphen to represent a blank space
      word += "-";
    } else {
      word += letter;
    }
    score += piece_bag[letter].value * working_sum[slot][1];
    wordMultiplier *= working_sum[slot][2];
  }

  $(".on-board").remove();

  let rack = $("#rack");

  // only serve up to 7 letters if there are enough in the bag
  // otherwise, serve what is left in the bag
  let numberOfLettersToServe =
    word.length > tiles_remaining ? tiles_remaining : word.length;

  for (let i = 0; i < numberOfLettersToServe; i++) {
    generateLetter(rack);
  }

  tiles_remaining -= numberOfLettersToServe;

  let previous_score = parseInt($("#score").text());
  // console.log(previous_score);
  $("#score").text(previous_score + score * wordMultiplier);
  $("#tiles-remaining").text(tiles_remaining);
  $("#word").text(word.toUpperCase());

  letters_on_board = 0;
  working_sum = {};
}
