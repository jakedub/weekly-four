/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let player = document.getElementsByClassName("player");
let music_player = document.getElementsByClassName("music-player");
let search = document.getElementsByClassName("search");
let search_form = document.getElementsByClassName("search-form");
let results = document.querySelector(".results");
let inputElement = document.getElementById("myInput");
let searchInput = document.getElementById("search_button");
let music = document.getElementById("music");
let preview = [];
// 2. Create your `submit` event for getting the user's search term

//Event Listener for the KeyPress

inputElement.addEventListener("keypress", function(event) { // NOTE: Need to change the event listener to Submit button click
  if (event.key == "Enter") {
    event.preventDefault();
    dataPull(inputElement.value );
  }
});

searchInput.addEventListener("click", dataPull);

// 3. Create your `fetch` request that is called after a submission.

function dataPull(search) {
  fetch("https://itunes.apple.com/search?limit=15&term=" + search)
      .then(function(response) {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

         //successful fetch function
          response.json().then(function(data){
            attached(data.results);
          });
        }
      )

     //error
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
}


// 4. Create a way to append the fetch results to your page
// NOTE: Looks like I'm doing this within the fetch request. Could put this in another function like:
function attached(songs){ //would need to update 3. and replace the below with a call of the function attached like: attached(pulledData) where pulledData is the data.results
preview = [];
  results.innerHTML = "";
  for (let i=0; i<songs.length; i++){
      let returnResponse = document.createElement("div");
      returnResponse.setAttribute('onclick', `play(${i})`);
      returnResponse.innerHTML = `
      <div class="box">
      <img src=${songs[i].artworkUrl60} alt="Album Image">
      <div class="interior">
      ${songs[i].trackName} <br/>
      ${songs[i].artistName}
      </div>
      </div>
      `;
      results.appendChild(returnResponse);
      preview.push(songs[i].previewUrl);
}
}
// 5. Create a way to listen for a click that will play the song in the audio play

function play(i){
  console.log(preview[i]);
  audio = document.getElementById("music");
  music.setAttribute('src', preview[i]);
}
