const FORM = document.querySelector("#book-form");
const FIRST_ROW = document.querySelector(".row");
const SINGLE_BOOK = document.querySelector("#book-list");

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

class Storage {
  static get_books(){
    let books;
    if(sessionStorage.getItem('books') === null) {
      books = [];
    } else {
      // Convert books from JSON to JS object
      books = JSON.parse(sessionStorage.getItem('books'));
    }
    return books;
  }

  static display_books(){
    const books = Storage.get_books();
    books.forEach(function(book){
      // Instantiate a new UI to access it methods
      const ui = new UI;
      // Add book to UI
      ui.add_book_to_list(book);
    });
  }

  static remove_book(title){
    // Get all the books stored in session storage
    const books = Storage.get_books();
    // Loop through each book until it matches the book title passed in
    books.forEach(function(book, index){
      if(book.title === title){
        // Remove the selected book from session storage
        books.splice(index, 1);
      }
    });
    // Add the remaining books to session storage
    sessionStorage.setItem('books', JSON.stringify(books));
  }

  static add_book(book){
    // Call function in the same class above
    const books = Storage.get_books();
    // Add to session storage
    books.push(book);
    // Convert a JavaScript object into a string
    // When sending data to a web server, the data has to be a string.
    sessionStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Storage.display_books, false);

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
    // Add book to Session Storage
    Storage.add_book(book);
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
  // Remove from Session Storage
  // Access the book title
  Storage.remove_book(event.target.parentElement.parentElement.parentElement.firstElementChild.textContent);
  event.preventDefault();
});
