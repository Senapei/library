let myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === "true" ? "has read" : "not read yet";
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addBookToLibrary(
  userBookId,
  usersTitle,
  usersAuthor,
  usersPages,
  usersHasRead
) {
  myLibrary.push(
    new Book(userBookId, usersTitle, usersAuthor, usersPages, usersHasRead)
  );
  displayBooks();
}

function deleteBookFromLib(bookIdToDelete) {
  //removing book from dom
  const elementToDelete = document.querySelector(
    `[data-library-id="${bookIdToDelete}"]`
  );
  elementToDelete.remove();

  //removing book from array
  myLibrary = myLibrary.filter((book) => {
    if (book.id !== bookIdToDelete) {
      return book;
    }
  });
}

function changeStatus(bookIdToChange, read) {
  //change status on screen
  if (read.textContent === "has read") {
    read.textContent = "not read yet";
  } else if (read.textContent === "not read yet") {
    read.textContent = "has read";
  } else {
    console.log("Change status error 1");
  }
  //change status in array
  for (let book of myLibrary) {
    if (book.id === bookIdToChange) {
      if (book.read === "has read") {
        book.read = "not read yet";
      } else if (book.read === "not read yet") {
        book.read = "has read";
      } else {
        console.log("Change status error 2");
      }
    }
  }
}

//function that will display the inputs from user into a card
function displayBooks() {
  const cardsSection = document.getElementsByClassName("card-section")[0];
  cardsSection.innerHTML = "";

  myLibrary.forEach((book, index) => {
    //change index
    book.id = index;

    //create card for book
    const card = document.createElement("div");
    card.classList.add("card");

    //create tags for the book image and book information
    const bookImage = document.createElement("img");
    const title = document.createElement("h1");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const hasRead = document.createElement("p");

    //setting the attributes and text content to match the input of user

    bookImage.setAttribute("src", "./bojji.jpg");
    bookImage.classList.add("card-img");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    hasRead.textContent = book.read;

    //append the image and book content onto the card
    card.appendChild(bookImage);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(hasRead);

    //adding data attribute to card
    card.setAttribute("data-library-id", index);

    //append the card onto the card section
    cardsSection.appendChild(card);

    //change read status button
    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.textContent = "Change Status";
    changeStatusBtn.addEventListener("click", () =>
      changeStatus(book.id, hasRead)
    );
    card.appendChild(changeStatusBtn);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete book";
    deleteButton.addEventListener("click", () => deleteBookFromLib(book.id));
    card.appendChild(deleteButton);
  });
}

//button to add book
const addBookButton = document.getElementsByClassName("button")[0];
//form container which will have the class toggled off/on it
const displayFormContainer =
  document.getElementsByClassName("form-container")[0];

//toggles the class that will show and hide the form to add books
addBookButton.addEventListener("click", () => {
  displayFormContainer.classList.toggle("form-container-hide");
});

//form inputs
const formBookName = document.getElementById("bookName");
const formBookAuthor = document.getElementById("bookAuthor");
const formBookPages = document.getElementById("bookPages");
const formHasRead = document.getElementById("hasRead");
const formButton = document.getElementsByClassName("submitFormButton")[0];

//submitting form
formButton.addEventListener("click", (e) => {
  //stops it from submit like default
  e.preventDefault();

  //check for which radio button was clicked
  const checkedButton = document.querySelector('input[type="radio"]:checked');

  //adds book to lib
  addBookToLibrary(
    myLibrary.length,
    formBookName.value,
    formBookAuthor.value,
    formBookPages.value,
    checkedButton.value
  );
  //this will toggle the class that hides and shows the form
  displayFormContainer.classList.toggle("form-container-hide");
});

//things for next time
/* 
- add localstorage
- make it neater
- do i need Object.create?



*/
