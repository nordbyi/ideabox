//Query Selectors
var saveButton = document.querySelector('#save-button')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var cardContainer = document.querySelector('#card-container')
var inputs = document.querySelectorAll('.block')
var toggleFavorites = document.querySelector('#nav-btn')
//show-starred-button
disableSaveButton()

//event Listeners
//show-starred-button
saveButton.addEventListener('click', function(event) {
  event.preventDefault()
  newIdea()
  storeIdea()
  renderCards()
  resetInputs()
  // disableSaveButton()
})

cardContainer.addEventListener('click', cardAction)

for(var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', disableSaveButton)
}

toggleFavorites.addEventListener('click', renderFaves)

//Global Variables
var ideas = []
var currentIdea;

//Functions
//show-starred-button function - everytime we envoke click, show favorited cards
// if ideas[i].star === true &&
function cardAction() {
  console.log(ideas)
  var cardID = event.target.closest('.card').id
  // console.log(event.target);
  for (var i = 0; i < ideas.length; i++) {
    // Deletes
    if (ideas[i].id === Number(cardID) && event.target.id === 'clear-x') {
      ideas.splice(i, 1)
      break
      // Stars
    }
    if(ideas[i].id === Number(cardID) && event.target.id === 'star') {
      ideas[i].updateIdea()
      console.log(ideas[i])
    }
  }
  renderCards()
}

function newIdea() {
  currentIdea = new Idea(titleInput.value, bodyInput.value)
}

function storeIdea() {
  ideas.push(currentIdea)
  console.log(ideas)
}

function resetInputs() {
  titleInput.value = ""
  bodyInput.value = ""
  disableSaveButton()
}

// var star1 = 'star';
// var star2 = 'star-active'

function renderCards() {
  cardContainer.innerHTML = ""
  for (var i = 0; i < ideas.length; i++) {
    // console.log(ideas[i].star)
    cardContainer.innerHTML += `
        <div class="card" id="${ideas[i].id}">
          <div class="card-header">
            <img class="star" id="star"  src="./assets/${ideas[i].star ? "star-active" : "star" }.svg">
            <img class="delete" id="clear-x" src="./assets/delete.svg">
            <img class="delete hidden" id="active-x" src="./assets/delete-active.svg">
          </div>
          <div class="card-body">
            <h2>${ideas[i].title}</h2>
            <p>${ideas[i].body}</p>
          </div>
          <div class="card-footer">
            <img class="comment" id="comment" src="./assets/comment.svg">
            <p>Comment</p>
          </div>
        </div>`
  }
}

function renderFaves() {
  cardContainer.innerHTML = ""
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
    cardContainer.innerHTML += `
        <div class="card" id="${ideas[i].id}">
          <div class="card-header">
            <img class="star" id="star"  src="./assets/${ideas[i].star ? "star-active" : "star" }.svg">
            <img class="delete" id="clear-x" src="./assets/delete.svg">
            <img class="delete hidden" id="active-x" src="./assets/delete-active.svg">
          </div>
          <div class="card-body">
            <h2>${ideas[i].title}</h2>
            <p>${ideas[i].body}</p>
          </div>
          <div class="card-footer">
            <img class="comment" id="comment" src="./assets/comment.svg">
            <p>Comment</p>
          </div>
        </div>`
      }
    }
}

function disableSaveButton() {
  if(!titleInput.value || !bodyInput.value) {
    saveButton.classList.add("disable")
    saveButton.disabled = true
  } else {
    saveButton.classList.remove("disable")
    saveButton.disabled = false
  }

}
