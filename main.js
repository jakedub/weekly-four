/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
let player = document.getElementsByClassName("player");
let music_player = document.getElementsByClassName("music-player");
let search = document.getElementsByClassName("search");
let search_form = document.getElementsByClassName("search-form");
let results = document.getElementsByClassName("results");
let inputElement = document.getElementById("myInput");
let searchInput = document.getElementById("search_button");
let music = document.getElementById("music");
// 2. Create your `submit` event for getting the user's search term

//Event Listener for the KeyPress

inputElement.addEventListener("keypress", function(event) { // NOTE: Need to change the event listener to Submit button click
  if (event.key == "Enter") {
    dataPull();
  }
});

searchInput.addEventListener("click", dataPull);

// 3. Create your `fetch` request that is called after a submission.

function dataPull() {
  fetch("https://itunes.apple.com/search?term=")
      .then(function(response) {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

         //successful fetch function
          response.json().then(function(data){
            console.log(data);
            let returnResponse = document.createElement("div");
            let input2 = inputElement.value;
            for (let i=0; i<data.length; i++){
              if (inputElement===data[i].artistName){
                console.log(data[i].artistName);
                returnResponse.innerHTML = `
                <div class="box">
                <img src=${artWorkUrl30} alt="Album Image">
                <p><span>Artist Name:</span>${data[i].artistName}</p>
                <p><span>Track: </span>${data[i].trackName}</p>
                <p><span>Album Name: </span>${data[i].collectionName}</p>
                <p><span>Album Price: </span>${data[i].collectionPrice}</p>
                </div>
                `;
                results.appendChild(returnResponse);
            }}
            console.log(data);
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
// function attached(songs){ //would need to update 3. and replace the below with a call of the function attached like: attached(pulledData) where pulledData is the data.results
//   let returnResponse = document.createElement("div");
//   let inputElement = inputElement.value;
//   for (let i=0; i<songs.length; i++){
//     if (inputElement===songs[i].artistName){
//       returnResponse.innerHTML = `
//       <div class="box">
//       <img src=${artWorkUrl30} alt="Album Image">
//       <p><span>Artist Name:</span>${data[i].artistName}</p>
//       <p><span>Track: </span>${data[i].trackName}</p>
//       <p><span>Album Name: </span>${data[i].collectionName}</p>
//       <p><span>Album Price: </span>${data[i].collectionPrice}</p>
//       </div>
//       `;
//       results.appendChild(returnResponse);
// }
// 5. Create a way to listen for a click that will play the song in the audio play

function play(){
  music.addEventListener("click"); //sets the event listener
  music.setAttribute("src")//need to make the source dynamic
}
