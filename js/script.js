FORM = document.querySelector("#book-form");

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
UI.prototype.showAlert = function(message, theClassName) {
  // Create div
  const DIV = document.createElement("div");
  // Add classes
  DIV.className = `alert ${className}`;
  // Add text
  DIV.append(message);
}

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
  } else {
    // Add book to list
    ui.add_book_to_list(book);

    // Clear form
    FORM.reset();
  }

  e.preventDefault();
});