// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {

}
// Event Listeners
document.getElementById("book-form").addEventListener('submit', function(e){
  console.log("Test");
  e.preventDefault();
});