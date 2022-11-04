//Query Selectors
var saveButton = document.querySelector('#save-button')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var cardContainer = document.querySelector('#card-container')
var inputs = document.querySelectorAll('.block')
console.log(inputs);

disableSaveButton()

//event Listeners
saveButton.addEventListener('click', function(event) {
  event.preventDefault()
  newIdea()
  storeIdea()
  addCard()
  resetInputs()
  // disableSaveButton()
})

cardContainer.addEventListener('click', cardAction)

for(var i = 0; i < inputs.length; i++) {
  console.log(inputs[i])
  inputs[i].addEventListener('keyup', disableSaveButton)
}

//Global Variables
var ideas = []
var currentIdea;

//Functions
function cardAction() {
  //if e.target.classList.id === event.target Id ; use method that will pull from array
  //event.target.parentNode.id
  //event.target.closest('.card')
  console.log(event.target.closest('.card').id)
}

function newIdea() {
  currentIdea = new Idea(titleInput.value, bodyInput.value)
}

function storeIdea() {
  ideas.push(currentIdea)
}

function resetInputs() {
  titleInput.value = ""
  bodyInput.value = ""
  disableSaveButton()
}

function addCard() {
  cardContainer.innerHTML += `
      <div class="card" id="${currentIdea.id}">
        <div class="card-header">
          <img class="star" id="white-star"  src="./assets/star.svg">
          <img class="star hidden" id="orange-star" src="./assets/star-active">
          <img class="delete" id="clear-x" src="./assets/delete.svg">
          <img class="delete hidden" id="active-x" src="./assets/delete-active.svg">
        </div>
        <div class="card-body">
          <h2>${currentIdea.title}</h2>
          <p>${currentIdea.body}</p>
        </div>
        <div class="card-footer">
          <img class="comment" id="comment" src="./assets/comment.svg">
          <p>Comment</p>
        </div>
      </div>`
}

function disableSaveButton() {
  console.log(!titleInput.value || !bodyInput.value)
  if(!titleInput.value || !bodyInput.value) {
    saveButton.classList.add("disable")
    saveButton.disabled = true
  } else {
    console.log("here!!!!!!")
    saveButton.classList.remove("disable")
    saveButton.disabled = false
  }

}
