const cardContainer = document.querySelector("#card-container");
const bookForm = document.getElementById("book-form");

const openModal = document.getElementById("open-modal");

const bookTitleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readStatusCheckbox = document.getElementById("read-status");

const myLibrary = [];

// Functions

// function to update the read status
function updateReadStatus(readStatusBtn, readStatus, title) {
  readStatusBtn.addEventListener("click", () => {
    readStatus = !readStatus;
    readStatusBtn.textContent = readStatus ? "Read" : "Not Read";
    if (readStatus) {
      readStatusBtn.classList.remove("btn-secondary");
      readStatusBtn.classList.add("btn-success");
    } else {
      readStatusBtn.classList.remove("btn-success");
      readStatusBtn.classList.add("btn-secondary");
    }
    // update the read status in myLibrary array
    myLibrary.forEach((book) => {
      if (book.title === title) {
        book.readStatus = readStatus;
        saveToLocalStorage();
        renderUI();
      }
    });
  });
}

// delete the selected book
function deleteBook(deleteBtn, title) {
  deleteBtn.addEventListener("click", () => {
    // delete from myLibrary array
    myLibrary.forEach((book, index) => {
      if (book.title === title) {
        myLibrary.splice(index, 1);
        saveToLocalStorage();
        renderUI();
      }
    });
  });
}

// when the page loads get the books from local storage

function renderUI() {
  cardContainer.innerHTML = "";
  myLibrary.forEach(({ title, author, pages, readStatus }) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    const titleElement = document.createElement("h5");
    titleElement.classList.add("card-title");
    titleElement.textContent = `Book Title : ${title}`;
    const authorElement = document.createElement("h6");
    authorElement.classList.add("card-subtitle", "mb-2", "text-muted");
    authorElement.textContent = `Author : ${author}`;
    const pagesElement = document.createElement("p");
    pagesElement.classList.add("card-text");
    pagesElement.textContent = `No of pages : ${pages}`;
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "justify-content-between");
    const readStatusBtn = document.createElement("button");
    readStatusBtn.textContent = readStatus ? "Read" : "Not Read";
    if (readStatus) {
      readStatusBtn.classList.add("btn", "btn-success");
    } else {
      readStatusBtn.classList.add("btn", "btn-secondary");
    }

    //make function to update the read status
    updateReadStatus(readStatusBtn, readStatus, title);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.textContent = "Delete";

    // function to delete the selected book
    deleteBook(deleteBtn, title);

    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(authorElement);
    cardBodyDiv.appendChild(pagesElement);
    buttonDiv.appendChild(readStatusBtn);
    buttonDiv.appendChild(deleteBtn);
    cardBodyDiv.appendChild(buttonDiv);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    cardContainer.prepend(colDiv);
  });
}

//  function for saving to local storage
function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// function for getting from local storage
function getBooksFromLocalStorage() {
  const books = JSON.parse(localStorage.getItem("myLibrary"));
  if (books) {
    // first clear the array
    myLibrary.length = 0;
    // push the books from local storage
    myLibrary.push(...books);
    renderUI();
  }
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookReadStatus) {
  const book = {
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages,
    readStatus: bookReadStatus,
  };
  myLibrary.push(book);
  //  function for saving to local storage
  saveToLocalStorage();
  // renderUI();

  //  get data from local storage
  getBooksFromLocalStorage();
}

//  Event Listeners

bookForm.addEventListener("submit", (e) => {
//   e.preventDefault();
  const bookTitle = bookTitleInput.value;
  const bookAuthor = authorInput.value;
  const bookPages = pagesInput.value;
  const bookReadStatus = readStatusCheckbox.checked;

  // use functions
  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookReadStatus);

  // clear the form
  bookForm.reset();

   
});

//  when the page loads get the books from local storage

// event lilstener for window load
window.addEventListener("load", getBooksFromLocalStorage());
