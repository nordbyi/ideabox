//Query Selectors
var saveButton = document.querySelector('#save-button')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var cardContainer = document.querySelector('#card-container')
//event Listeners
saveButton.addEventListener('click', function(event) {
  event.preventDefault()
  addIdeas()
})

//Global Variables
var ideas = []
var currentIdea;

//Functions
function addIdeas() {
  currentIdea = new Idea(titleInput.value, bodyInput.value)
  ideas.push(currentIdea)
  cardContainer.innerHTML += `
      <div class="card">
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

  console.log(ideas)
}
