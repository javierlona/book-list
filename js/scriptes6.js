const FORM = document.querySelector("#book-form");
const FIRST_ROW = document.querySelector(".row");
const SINGLE_BOOK = document.querySelector('#book-list');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  add_book_to_list(book) {
    // Create element
    let ROW = document.createElement("tr");
    // Populate the element with content
    ROW.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"><i class="material-icons">delete_forever</i></a></td>
    `;
    // Insert book instance into row
    SINGLE_BOOK.append(ROW);
  }

  delete_book(target) {
    // (target); the <i> tag
    // (target.parentElement); the <a> tag
    // (target.parentElement.parentElement); the <td> tag
    if(target.parentElement.classList.contains("delete")){
      // DOM traversal to delete the <tr> tag
      target.parentElement.parentElement.parentElement.remove();
    // Show message
      M.toast({html: "Book Removed", classes: "error"})
    }
  }

  show_alert(message, theClassName) {
    // Create div
    const DIV = document.createElement("div");
    // Add classes
    DIV.classList.add("alert", `${theClassName}`);
    // Add text to element
    DIV.append(message);
    // Insert alert into DOM
    FIRST_ROW.insertBefore(DIV, FORM);
    // Timeout after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();}, 3000);
  }
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
  // Validate fields are filled
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
  // Create instance of UI to access its methods
  let ui = new UI();
  // Delete the selected book
  ui.delete_book(event.target);
  event.preventDefault();
});