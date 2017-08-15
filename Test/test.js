let searchBar = document.getElementById('searchBar');
let resultsContainer = document.getElementById('searchResultsContainer');
let previewUrls = [];
function fetchArtistData(myQuery) {
  // let queryURL = `https://itunes.apple.com/search?term=${myQuery}&entity=allArtist&attribute=allArtistTerm`;
  let queryURL = `https://itunes.apple.com/search?term=${myQuery}&limit=25`;
  fetch(queryURL)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Response status: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          console.log('Here is the data: ', data.results);
          capturedData = data.results;
          // console.log(capturedData[0].previewUrl);
          createTiles(capturedData);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
  });
}

function checkForSubmission() {
  if (event.which == 13 || event.keyCode == 13) {
    encodeQuery();
    return;
  }
}

function createTiles(songList) {
  previewUrls = [];
  resultsContainer.innerHTML = '';
  // let oldTiles = document.getElementsByClassName('tile');
  //   for (let i=0; i<oldTiles.length; i++) {
  //     resultsContainer.removeChild(oldTiles[i]);
  //   }

  for (let i=0; i<songList.length; i++) {
    newTile = document.createElement('div');
    newTile.setAttribute('class', 'tile');
    newTile.setAttribute('onclick', `playPreview(${i})`);
    newTile.innerHTML = `
      <img src='${songList[i].artworkUrl100}'>
      <p class='songName'>${songList[i].trackName}</p>
      <p class='artistName'>${songList[i].artistName}</p>
    `;
    resultsContainer.appendChild(newTile);
    previewUrls.push(songList[i].previewUrl);
  }
}

function encodeQuery() {
  // console.log(searchField.value);
  let myOldQuery = searchField.value;
  let myNewQuery = [];
  for (let i=0; i<myOldQuery.length; i++) {
    // console.log(myOldQuery[i]);
    // console.log(myOldQuery[i] === ' ');
    (myOldQuery[i] === ' ') ? myNewQuery[i] = '+' : myNewQuery[i] = myOldQuery[i];
  }
  searchField.value = '';
  // console.log(myNewQuery.join(''));
  myNewQuery = myNewQuery.join('');
  // console.log(myNewQuery);
  fetchArtistData(myNewQuery);
}

function playPreview(i) {
  console.log(previewUrls[i]);
  audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.setAttribute('src', previewUrls[i]);
}
