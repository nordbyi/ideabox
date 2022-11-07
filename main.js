var saveButton = document.querySelector('#saveButton')
var titleInput = document.querySelector('#titleInput')
var bodyInput = document.querySelector('#bodyInput')
var cardContainer = document.querySelector('#cardContainer')
var inputs = document.querySelectorAll('.block')
var toggleFavorites = document.querySelector('#navBtn')
var searchBar = document.querySelector('#siteSearch')

window.addEventListener('load', disableSaveButton)
cardContainer.addEventListener('click', cardAction)
cardContainer.addEventListener('mouseover', deleteHover)
cardContainer.addEventListener('mouseout', deleteInactive)
toggleFavorites.addEventListener('click', toggleView)

searchBar.addEventListener('keyup', function() {
  filterInput()
})

saveButton.addEventListener('click', function(event) {
  event.preventDefault()
  newIdea()
  storeIdea()
  currentView === "All" ? renderCards() : renderCards(faveArray())
  resetInputs()
})

for(var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', disableSaveButton)
}

var ideas = []
var currentIdea;
var currentView = "All"

function filterInput() {
  var dynamicArray
  currentView === "All" ? dynamicArray = ideas : dynamicArray = faveArray()
  var filteredCards = []
  for (var i = 0; i < dynamicArray.length; i++) {
    if (dynamicArray[i].title.includes(searchBar.value) || dynamicArray[i].body.includes(searchBar.value) ) {
      filteredCards.push(dynamicArray[i])
    }
  }
  renderCards(filteredCards)
}

function cardAction() {
  var cardID = event.target.closest('.card').id
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(cardID) && event.target.id === 'active-x') {
      ideas.splice(i, 1)
      break
    }
    if(ideas[i].id === Number(cardID) && event.target.id === 'star') {
      ideas[i].updateIdea()
    }
  }
  currentView === "All" ? renderCards() : renderCards(faveArray())
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

function renderCards(arr = ideas) {
  cardContainer.innerHTML = ""
  for (var i = 0; i < arr.length; i++) {
    cardContainer.innerHTML += `
        <div class="card" id="${arr[i].id}">
          <div class="card-header">
            <img class="star" id="star"  src="./assets/${arr[i].star ? "star-active" : "star" }.svg">
            <img class="delete" id="clear-x" src="./assets/delete.svg">
            <img class="delete hidden" id="active-x" src="./assets/delete-active.svg">
          </div>
          <div class="card-body">
            <h2>${arr[i].title}</h2>
            <p>${arr[i].body}</p>
          </div>
          <div class="card-footer">
          </div>
        </div>`
  }
}

function faveArray() {
  var faveIdeas = []
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star) {
    faveIdeas.push(ideas[i])
    }
  }
  return faveIdeas
}

function toggleView() {
  if (currentView === "All") {
    currentView = "Favorites"
    renderCards(faveArray())
      toggleFavorites.innerText = "Show All Ideas"
  } else {
    currentView = "All"
    renderCards()
    toggleFavorites.innerText = "Show Starred Ideas"
  }
}

function deleteHover() {
  if (event.target.id === 'clear-x') {
    event.target.classList.toggle('hidden')
    event.target.nextElementSibling.classList.toggle('hidden')
  }
}

function deleteInactive() {
  if (event.target.id === 'active-x') {
    event.target.classList.toggle('hidden')
    event.target.previousElementSibling.classList.toggle('hidden')
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
