import './style.css';
import populateList from './modules/popList.js';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
let gameId = 'gQXbFSpVxtMzgpxfwbkS';
const createGame = async () => {
  const apiUrl = `${baseUrl}games/`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Afggame',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const responseJson = await response.json();
  const id = responseJson.result.split(' ')[3];
  gameId = id;
};

const addScore = async (username, userScore) => {
  const gameApiUrl = `${baseUrl}games/${gameId}/scores/`;
  await fetch(gameApiUrl, {
    method: 'POST',
    body: JSON.stringify({
      user: username,
      score: userScore,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const getScoreList = async () => {
  const gameApiUrl = `${baseUrl}games/${gameId}/scores/`;
  const response = await fetch(gameApiUrl, {
    method: 'GET',
  });

  const responseJSON = await response.json();
  console.log(responseJSON.result);
  populateList(responseJSON.result);
};

if (gameId === '') {
  createGame();
}

window.addEventListener('load', () => {
  getScoreList();

  const userInput = document.querySelector('.add-name');
  const scoreInput = document.querySelector('.add-score');

  document.querySelector('input[value="Submit"]').addEventListener('click', () => {
    if (userInput.value !== '' && scoreInput.value !== '') {
      addScore(userInput.value, scoreInput.value);
      userInput.value = '';
      scoreInput.value = '';
    }
  });

  document.querySelector('button[value="Refresh"]').addEventListener('click', () => {
    getScoreList();
  });
});
