class Book {
  constructor(title, author, totalPages, pageYouOn) {
    this.title = title;
    this.author = author;
    this["total pages"] = totalPages;
    this["page You On"] = pageYouOn;
  }
}

let elem = (function () {
  let home = document.querySelector("#home"),
    books = document.querySelector("#books"),
    container = document.querySelector(".container"),
    main = document.querySelector("main"),
    addBookBtn = document.querySelector(".js-add-btn"),
    submitBtn = document.querySelector(".btn-submit"),
    formContainer = document.querySelector(".form-container"),
    form = document.querySelector("form"),
    updateForm = document.querySelector(".update-form"),
    updateFormContainer = document.querySelector(".update-form-container"),
    introContainer = document.querySelector(".intro");

  return {
    home,
    books,
    container,
    main,
    addBookBtn,
    submitBtn,
    formContainer,
    form,
    updateForm,
    updateFormContainer,
    introContainer,
  };
})();

let data = (function () {
  //This variable will store the index of the specific book item..
  //And we will use the index when updating book..
  let editObjIndex,
    myLibraryLocalStorage = JSON.parse(localStorage.getItem("myLibrary")),
    myLibrary = myLibraryLocalStorage || [];

  return {
    editObjIndex,
    myLibraryLocalStorage,
    myLibrary,
  };
})();

addBookToView();

elem.addBookBtn.addEventListener("click", () => {
  elem.formContainer.classList.remove("hide");
  elem.main.classList.add("hide");
  elem.introContainer.classList.add("hide");
});

elem.form.addEventListener("submit", (e) => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let totalPages = document.querySelector("#total_pages").value;
  let pageYouOn = document.querySelector("#page_you_on").value;

  let bookObj = new Book(title, author, totalPages, pageYouOn);
  data.myLibrary.push(bookObj);
  localStorage.setItem("myLibrary", JSON.stringify(data.myLibrary));
  elem.main.classList.remove("hide");
  elem.formContainer.classList.add("hide");

  clearView();
  addBookToView();
  elem.form.reset();
  e.preventDefault();
});

// || Event for form update...
elem.updateForm.addEventListener("submit", (e) => {
  let title = document.querySelector("#title_update").value;
  let author = document.querySelector("#author_update").value;
  let totalPages = document.querySelector("#total_pages_update").value;
  let pageYouOn = document.querySelector("#page_you_on_update").value;
  let book = new Book(title, author, totalPages, pageYouOn);
  data.myLibrary.splice(data.editObjIndex, 1, book);
  localStorage.setItem("myLibrary", JSON.stringify(data.myLibrary));

  elem.main.classList.remove("hide");
  elem.updateFormContainer.classList.add("hide");
  clearView();
  addBookToView();
  elem.updateForm.reset();
  e.preventDefault();
});

// Click event for 'home' and 'books' link
elem.home.addEventListener("click", () => {
  elem.introContainer.classList.remove("hide");
  elem.main.classList.add("hide");
  elem.formContainer.classList.add("hide");
  elem.updateFormContainer.classList.add("hide");
});

elem.books.addEventListener("click", () => {
  elem.introContainer.classList.add("hide");
  elem.main.classList.remove("hide");
  elem.formContainer.classList.add("hide");
  elem.updateFormContainer.classList.add("hide");
});

//Function Declarations...
//Book Constructor
// function Book(title, author, totalPages, pageYouOn) {
//   this.title = title;
//   this.author = author;
//   this["total pages"] = totalPages;
//   this["page You On"] = pageYouOn;
// }

// Add books to DOM
function addBookToView() {
  data.myLibrary.forEach((obj, index) => {
    let box = document.createElement("div");
    let buttonContainer = document.createElement("div");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    box.classList.add("box");
    elem.container.appendChild(box);
    for (let prop in obj) {
      let para = document.createElement("p");
      let strong = document.createElement("strong");
      let span = document.createElement("span");
      let value = obj[prop];
      if (typeof value === "number") {
        value = value.toString();
      } else if (typeof value === "boolean") {
        value = value ? "Yes" : "No";
      }
      strong.textContent = prop.toUpperCase() + ": ";
      span.textContent = value.toUpperCase();

      para.appendChild(strong);
      para.appendChild(span);
      box.appendChild(para);
    }

    deleteBtn.addEventListener("click", () => {
      data.myLibrary.splice(index, 1);
      localStorage.setItem("myLibrary", JSON.stringify(data.myLibrary));
      clearView();
      addBookToView();
    });

    editBtn.addEventListener("click", () => {
      elem.updateFormContainer.classList.remove("hide");
      elem.updateForm.querySelector("#title_update").value = obj.title;
      elem.updateForm.querySelector("#author_update").value = obj.author;
      elem.updateForm.querySelector("#total_pages_update").value =
        obj["total pages"];
      elem.updateForm.querySelector("#page_you_on_update").value =
        obj["page You On"];
      elem.main.classList.add("hide");
      data.editObjIndex = index;
    });

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";
    editBtn.classList.add("edit-btn");
    buttonContainer.appendChild(editBtn);
    deleteBtn.classList.add("delete-btn");
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.classList.add("form-controls");
    box.appendChild(buttonContainer);
  });
}

// Clear DOM
function clearView() {
  let boxes = document.querySelectorAll(".box");
  Array.from(boxes).forEach((item) => {
    let box = document.querySelector(".box");
    elem.container.removeChild(box);
  });
}
