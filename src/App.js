import './App.css';
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import { WinningModal } from './WinningModal';
import { GameSetUp } from './GameSetUp';

function App() {
  let cardsClicked = [];

  const [pairsMatched, setPairsMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showGameSetUp, setShowGameSetUp] = useState(false);
  const [tiles, setTiles] = useState(12);
  const [background, setBackground] = useState('background1');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openGameSetUp = () => {
    setShowGameSetUp(true);
  };

  const closeGameSetUp = () => {
    setShowGameSetUp(false);
  };

  function resetBoard() {
    closeModal();
    $('#gameBoard').empty()
    cardsClicked = [];
    setPairsMatched(0);
    setAttempts(0);
  }

  function createBoard() {
    resetBoard();
    if (tiles === 12) {
      $('#gameBoard').addClass('gameBoardSmall').removeClass('gameBoardMedium gameBoardLarge')
    } else if (tiles === 16) {
      $('#gameBoard').addClass('gameBoardMedium').removeClass('gameBoardSmall gameBoardLarge')
    } else {
      $('#gameBoard').addClass('gameBoardLarge').removeClass('gameBoardMedium gameBoardSmall')
    }
    for (let i = 0; i < tiles; i++) {
      $('#gameBoard').append('<div class="card" id="card-' + i + '"><img class="card-back" src="./CatImages/card-' + background + '.jpg"/></div>')

      $('#card-' + i).on("click", function (event) {
        event.preventDefault();
        let id = $(this).attr('id');
        turnCard(id)
      })

    }
    setUpCards();
  }

  function setUpCards() {
    var list = []
    for (let n = 0; n < tiles; n++) {
      list.push(n)
    }

    for (let i = 1; i <= 10; i++) {
      let num1 = (Math.floor(Math.random() * list.length))
      let card1 = list[num1]
      $('#card-' + card1).append('<img class="card-front" src="./CatImages/cat' + i + '.png"/>')
      list.splice(num1, 1)
      let num2 = (Math.floor(Math.random() * list.length))
      let card2 = list[num2]
      $('#card-' + card2).append('<img class="card-front" src="./CatImages/cat' + i + '.png"/>')
      list.splice(num2, 1)
    }
  }

  function turnCard(id) {
    if (id !== cardsClicked[0]) {
      if (cardsClicked.length < 2) {
        $('#' + id + ' > .card-back').addClass("flipped");
        $('#' + id + ' > .card-front').addClass("flipped");
        $('#' + id).addClass("flipped");
        cardsClicked.push(id);
        if (cardsClicked.length === 2) {
          setTimeout(checkPair, 1000, cardsClicked[0], cardsClicked[1])
        }
      }
    }
  }

  function turnCardBack(id) {
    $('#' + id + ' > .card-back').removeClass("flipped");
    $('#' + id + ' > .card-front').removeClass("flipped");
    $('#' + id).removeClass("flipped");
  }

  function checkPair(card1, card2) {
    let img1 = $('#' + card1 + ' > .card-front');
    let img2 = $('#' + card2 + ' > .card-front');
    if ($(img1).attr("src") === $(img2).attr("src")) {
      setPairsMatched((pairsMatched) => pairsMatched + 1);
      img1.addClass("animated bounce");
      img2.addClass("animated bounce");
      setTimeout(function () {
        $('#' + card1).css('visibility', 'hidden');
        $('#' + card2).css('visibility', 'hidden');
      }, 1000);

    } else {
      turnCardBack(card1);
      turnCardBack(card2);
    }
    setAttempts(attempts => attempts + 1)
    cardsClicked = [];
  }

  function changeBackground() {
    $('.card-back').attr("src", "./CatImages/card-" + background + ".jpg");
  }

  useEffect(() => {
    if (pairsMatched === tiles / 2) {
      openModal();
    }
  }, [pairsMatched])

  useEffect(() => {
    createBoard();
  }, [tiles])

  useEffect(() => {
    changeBackground()
  }, [background])


  function handleCallback(tiles) {
    setTiles(tiles);
  }

  function handleBackgroundChange(background) {
    setBackground(background);
  }

  return (
    <div className="App">
      <h1>Cat Memory Game</h1>
      <div id="newGame" className="btn" onClick={createBoard}>New Game</div>
      <br></br>
      <div id="gameSettings" className="btn" onClick={openGameSetUp}>Settings</div>
      {showGameSetUp ? <GameSetUp closeGameSetUp={closeGameSetUp} handleCallback={handleCallback} handleBackgroundChange={handleBackgroundChange}/> : null}
      <div id="gameBoard"></div>
      {showModal ?
        <WinningModal showModal={showModal} closeModal={closeModal} attempts={attempts} /> : null
      }
    </div>
  );
}

export default App;