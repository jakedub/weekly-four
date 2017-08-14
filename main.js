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
// 2. Create your `submit` event for getting the user's search term

//Event Listener for the KeyPress

inputElement.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    dataPull();
  }
});

// 3. Create your `fetch` request that is called after a submission.

function dataPull(query) {
    let api = "https://itunes.apple.com/search?term=jack+johnson&limit=25";
  fetch(api)
      .then(function(response) {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

         //successful fetch function
          response.json().then(function(data){
            let returnResponse = document.createElement("div");
            let inputElement = inputElement.value;
            console.log(data);
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
                container.appendChild(returnResponse);
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

// 5. Create a way to listen for a click that will play the song in the audio play





//set event listener to trigger search only after 'enter' is pressed.


//fetch
