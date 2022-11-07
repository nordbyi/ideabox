//Query Selectors
var saveButton = document.querySelector('#saveButton')
var titleInput = document.querySelector('#titleInput')
var bodyInput = document.querySelector('#bodyInput')
var cardContainer = document.querySelector('#cardContainer')
var inputs = document.querySelectorAll('.block')
var toggleFavorites = document.querySelector('#navBtn')
var searchBar = document.querySelector('#siteSearch')

disableSaveButton()

//event Listeners
//show-starred-button
searchBar.addEventListener('keyup', function() {
  filterInput()
  //filterCard based on "string of letter" or "phrase" (searchObject.value)
})

saveButton.addEventListener('click', function(event) {
  event.preventDefault()
  newIdea()
  storeIdea()
  renderCards()
  resetInputs()
  // disableSaveButton()
})

cardContainer.addEventListener('click', cardAction)

cardContainer.addEventListener('mouseover', deleteHover)
function deleteHover() {
  if (event.target.id === 'clear-x') {
    event.target.classList.toggle('hidden') 
    event.target.nextElementSibling.classList.toggle('hidden')
  } 
}
cardContainer.addEventListener('mouseout', deleteInactive)
function deleteInactive() {
  if (event.target.id === 'active-x') {
    event.target.classList.toggle('hidden') 
    event.target.previousElementSibling.classList.toggle('hidden')
  } 
}
  


for(var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', disableSaveButton)
}

toggleFavorites.addEventListener('click', function() {
  // renderFaves(faveArray())
  if (currentView === "All") {
    currentView = "Favorites"
    renderCards(faveArray())
      toggleFavorites.innerText = "Show All Ideas"
  } else {
    currentView = "All"
    renderCards()
    toggleFavorites.innerText = "Show Starred Ideas"
  }
})


//Global Variables
var ideas = []
var currentIdea;
var currentView = "All"

//Functions
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
  console.log(ideas)
  var cardID = event.target.closest('.card').id
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === Number(cardID) && event.target.id === 'active-x') {
      ideas.splice(i, 1)
      break
    }
    if(ideas[i].id === Number(cardID) && event.target.id === 'star') {
      ideas[i].updateIdea()
      console.log(ideas[i])
    }
  }
  currentView === "All" ? renderCards() : renderCards(faveArray())
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

function renderCards(arr = ideas) { //faveFUNCTION EVURRRRR!!!
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
  // faveIdeas.push(ideas[i].star)
  //when show starred ideas is clicked we want to render the faveIdeas variable
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
//ray of ideas => make array of favorite ideas

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
