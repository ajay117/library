let home = document.querySelector("#home");
let books = document.querySelector("#books");
let container = document.querySelector(".container");
let main = document.querySelector("main");
let addBookBtn = document.querySelector(".js-add-btn");
let submitBtn = document.querySelector(".btn-submit");
let formContainer = document.querySelector(".form-container");
let form = document.querySelector("form");
let updateForm = document.querySelector(".update-form");
let updateFormContainer = document.querySelector(".update-form-container");
let introContainer = document.querySelector(".intro");
let editObjIndex;
let myLibraryLocalStorage = JSON.parse(localStorage.getItem("myLibrary"));
let myLibrary = myLibraryLocalStorage || [];

addBookToView();

addBookBtn.addEventListener("click", () => {
  formContainer.classList.remove("hide");
  main.classList.add("hide");
  introContainer.classList.add("hide");
  // form.classList.remove('hide');
});

form.addEventListener("submit", (e) => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let totalPages = document.querySelector("#total_pages").value;
  let pageYouOn = document.querySelector("#page_you_on").value;

  let bookObj = new Book(title, author, totalPages, pageYouOn);
  myLibrary.push(bookObj);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  main.classList.remove("hide");
  formContainer.classList.add("hide");

  clearView();
  addBookToView();
  form.reset();
  e.preventDefault();
});

// || Event for form update...
updateForm.addEventListener("submit", (e) => {
  let title = document.querySelector("#title_update").value;
  let author = document.querySelector("#author_update").value;
  let totalPages = document.querySelector("#total_pages_update").value;
  let pageYouOn = document.querySelector("#page_you_on_update").value;
  let book = new Book(title, author, totalPages, pageYouOn);
  // console.log(book,editObjIndex);
  myLibrary.splice(editObjIndex, 1, book);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  main.classList.remove("hide");
  updateFormContainer.classList.add("hide");
  clearView();
  addBookToView();
  updateForm.reset();
  e.preventDefault();
});

// Click event for 'home' and 'books' link
home.addEventListener("click", () => {
  introContainer.classList.remove("hide");
  main.classList.add("hide");
  formContainer.classList.add("hide");
  updateFormContainer.classList.add("hide");
});

books.addEventListener("click", () => {
  introContainer.classList.add("hide");
  main.classList.remove("hide");
  formContainer.classList.add("hide");
  updateFormContainer.classList.add("hide");
});

//Function Declarations...
//Book Constructor
function Book(title, author, totalPages, pageYouOn) {
  this.title = title;
  this.author = author;
  this["total pages"] = totalPages;
  this["page You On"] = pageYouOn;
}

// Add books to DOM
function addBookToView() {
  myLibrary.forEach((obj, index) => {
    let box = document.createElement("div");
    let buttonContainer = document.createElement("div");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    box.classList.add("box");
    container.appendChild(box);
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
      myLibrary.splice(index, 1);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      clearView();
      addBookToView();
    });

    editBtn.addEventListener("click", () => {
      updateFormContainer.classList.remove("hide");

      updateForm.querySelector("#title_update").value = obj.title;
      updateForm.querySelector("#author_update").value = obj.author;
      updateForm.querySelector("#total_pages_update").value =
        obj["total pages"];
      updateForm.querySelector("#page_you_on_update").value =
        obj["page You On"];
      main.classList.add("hide");
      editObjIndex = index;
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
    container.removeChild(box);
  });
}
