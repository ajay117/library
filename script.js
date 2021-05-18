let body = document.querySelector('body');
let container = document.querySelector('.container');
let submitButton = document.querySelector('button');
let myLibrary = [];
let button = document.querySelectorAll('buttton');
let addBookCard = document.querySelector('div.card.icon');
let form = document.querySelector('fieldset');

addBookCard.addEventListener('click', () => {
    form.classList.remove('hide');
});

submitButton.addEventListener('click', createDisplay);

//Functions...
function Book(title, author, numOfPages, numOfPagesRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.numOfPagesRead = numOfPagesRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numOfPages}, ${this.read ? 'already finished reading' : 'not read yet'}.`;
}

function createDisplay() {
    const title = document.querySelector('input[data-name="title"]');
    const author = document.querySelector('input[data-name="author"]');
    const pages = document.querySelector('input[data-name="pages"]');
    const isRead = document.querySelector('input[data-name="isRead"]');

    if (title.value && author.value && pages.value && isRead.value) {
        addBookToLibrary(title.value, author.value, pages.value, isRead.value);
        createCard(myLibrary[myLibrary.length - 1]);
    }
    title.value = null;
    author.value = null;
    pages.value = null;
    isRead.value = null;
    form.classList.add('hide');
}


//Create Card...
function createCard(item) {
    let container = document.querySelector('.container');
    let div = document.createElement('div');
    let button = document.createElement('button');
    let childDiv = document.createElement('div');
    let options = ['Add','Complete','Subtract'];
    for(let key in item) {
        if (key !== 'id' && (typeof(item[key]) !== 'function')) {
            let name = item[key];
            let para = document.createElement('p');
            switch (key) {
                case 'title':
                    para.textContent = 'Title : ' + name;  
                    break;
                case 'author':
                    para.textContent = 'Author : ' + name;
                    break;
                case 'numOfPages':
                    para.textContent = 'Pages : ' + name;
                    break;
                case 'numOfPagesRead':
                    para.textContent = 'Completed : ' + name;
                    break;
            }
            div.appendChild(para);
        }
    }
    for(let i = 0; i < 3; i++) {
    let button = document.createElement('button');
    button.textContent = options[i];
    childDiv.appendChild(button);
    }
    childDiv.setAttribute('class','options container');
    div.appendChild(childDiv);

    button.textContent = 'Delete';
    button.setAttribute('class','delete');

    div.appendChild(button);
    div.setAttribute('class', 'card');
    container.appendChild(div);

    button.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item, 1));
        container.removeChild(div);
        console.log(myLibrary);
    });
}

function addBookToLibrary(title, author, numOfPages, numOfPagesRead) {
    let book = new Book(title, author, numOfPages, numOfPagesRead);
    // let id = myLibrary.length;
    // book.id = id;
    myLibrary.push(book);
}

// addBookToLibrary('love','Ajay',233,123);
// addBookToLibrary('love','Ajay',233,123);
// addBookToLibrary('love','Ajay',233,123);


// myLibrary.forEach(item => createCard(item));
console.log(myLibrary);