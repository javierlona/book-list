const FORM = document.querySelector("#book-form");
const CONTAINER = document.querySelector(".row");

// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {

}

UI.prototype.add_book_to_list = function(book){
  console.log(book);
  const LIST = document.querySelector("#book-list");
  // Create element
  const ROW = document.createElement("tr");
  // Template literal with backticks
  ROW.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  LIST.append(ROW);

}

// Show Alert
// UI.prototype.show_alert = function(message, theClassName) {
//   // Create div
//   const DIV = document.createElement("div");
//   // Add classes
//   DIV.className = `alert ${theClassName}`;
//   // Add text
//   DIV.appendChild(document.createTextNode(message));
//   console.log(DIV);
//   // Insert alert
//   CONTAINER.insertBefore(DIV, FORM);

//   // Timeout after 3 seconds
//   // setTimeout(function() {
//   //   document.querySelector('.alert').remove();}, 3000);
// }

  // Create div
  const DIV = document.createElement("div");
  // Add classes
  DIV.className = "alert error";
  // Add text
  DIV.append("message in a bottle");
  console.log(DIV);
  // Insert alert
  CONTAINER.insertBefore(DIV, FORM);

// Event Listeners
FORM.addEventListener('submit', function(e){
  // Get form values
  let title = document.querySelector("#title").value,  
        author = document.querySelector("#author").value, 
        isbn = document.querySelector("#isbn").value;

  // Instantiate book
  let book = new Book(title, author, isbn);
  // Instantiate UI
  let ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    alert('Failed');
    ui.show_alert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.add_book_to_list(book);

    // Clear form
    FORM.reset();
  }

  e.preventDefault();
});