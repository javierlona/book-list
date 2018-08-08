const FORM = document.querySelector("#book-form");
const FIRST_ROW = document.querySelector(".row");
const SINGLE_BOOK = document.querySelector('#book-list');

// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}

UI.prototype.delete_book = function(target) {
  if(target.classList.contains("delete")){
    // DOM traversal to delete the <tr> tag
    target.parentElement.parentElement.remove();
  }
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
UI.prototype.show_alert = function(message, theClassName) {
  // Create div
  const DIV = document.createElement("div");
  // Add classes
  DIV.classList.add("alert", `${theClassName}`);
  // Add text
  DIV.append(message);
  console.log(DIV);
  // Insert alert
  FIRST_ROW.insertBefore(DIV, FORM);
  // M.toast({html: 'Keep adding more!', classes: "success"});

  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();}, 3000);
}



// Event Listener for adding a book
FORM.addEventListener("submit", function(e){
  // Get form values
  let title = document.querySelector("#title").value,  
        author = document.querySelector("#author").value, 
        isbn = document.querySelector("#isbn").value;

  // Instantiate book
  let book = new Book(title, author, isbn);
  // Instantiate UI
  let ui = new UI();

  // Validate
  if(title === "" || author === "" || isbn === "") {
    ui.show_alert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.add_book_to_list(book);

    // Show success
    ui.show_alert("Book Added!", "success");

    // Clear form
    FORM.reset();
  }

  e.preventDefault();
});

// Event listener for deleting a book
SINGLE_BOOK.addEventListener("click", function(event){
  console.log(123);

  let ui = new UI();
  ui.delete_book(event.target);

  // Show message
  ui.show_alert("Book Removed", "success");

  event.preventDefault();
});