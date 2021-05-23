'use strict';

let myLibrary = [
    // {
    //     title : 'Harry Potter',
    //     author : 'Ajay',
    //     numOfPages : 200,
    //     numOfPagesRead : 170
    // },
    // {
    //     title : 'Harry Potter',
    //     author : 'Ajay',
    //     numOfPages : 200,
    //     numOfPagesRead : 170
    // },
    // {
    //     title : 'Harry Potter',
    //     author : 'Ajay',
    //     numOfPages : 200,
    //     numOfPagesRead : 170
    // }
];
let body = document.querySelector('body');
let container = document.querySelector('.container');
let submitButton = document.querySelector('button');
let button = document.querySelectorAll('buttton');
let addBookCard = document.querySelector('.icon');
let closeBtn = document.querySelector('.js-close');
let form = document.querySelector('form'); 

let testArray = JSON.parse(localStorage.getItem('book'));
myLibrary = testArray.slice();
console.log(myLibrary);

myLibrary.forEach(item => {
    createCard(item);
});

addBookCard.addEventListener('click', () => {
    //Adding 'show-pos' class will drag change the left property of form from -10000px to 0.
    form.classList.add('show-pos');
});
closeBtn.addEventListener('click', () => {
    form.classList.remove('show-pos');  
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

function createDisplay(e) {
    e.preventDefault();
    // const title = document.querySelector('input[data-name="title"]');
    let bookTitle = document.querySelector('input#title').value;
    let bookAuthor = document.querySelector('input#author').value;
    let bookTotalPage = Number(document.querySelector('input#total-pages').value);
    let pageYourAreOn = Number(document.querySelector('input#page-read').value);

    
    if(bookTotalPage < 1 || pageYourAreOn < 1) {
        alert('Page number should not be less than 1.');
        return;
    } else if(pageYourAreOn > bookTotalPage) {
        alert('Page number should be less than or equal to total pages.');
        return;
    } 

    if (bookTitle && bookAuthor && bookTotalPage && pageYourAreOn) {        
        addBookToLibrary(bookTitle, bookAuthor, bookTotalPage, pageYourAreOn);
        createCard(myLibrary[myLibrary.length - 1]);
    }   
    clearForm();
    form.classList.remove('show-pos');

    //To clear Form inputs..
    function clearForm() {
        document.querySelector('input#title').value = null;
        document.querySelector('input#author').value = null;
        document.querySelector('input#total-pages').value = null;
        document.querySelector('input#page-read').value
    }
}


//All info about book will place inside this card...
//Take element from main array and populate dom...
function createCard(item) {
    let container = document.querySelector('.container');
    let div = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let childDiv = document.createElement('div');
    let options = ['Add','Complete','Subtract'];
    for(let key in item) {
        if (key !== 'id' && (typeof(item[key]) !== 'function')) {
            let value = item[key];
            let para = document.createElement('p');
            switch (key) {
                case 'title':
                    para.textContent = 'Title : ' + value;  
                    break;
                case 'author':
                    para.textContent = 'Author : ' + value;
                    break;
                case 'numOfPages':
                    para.textContent = 'Pages : ' + value;
                    break;
                case 'numOfPagesRead':
                    para.textContent = 'Completed : ' + value;
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
    
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('class','delete');

    div.appendChild(deleteBtn);
    div.setAttribute('class', 'card');    

    container.appendChild(div);

    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item, 1));
        container.removeChild(div);
    });

    
    //For Add, Complete and Subtract Button
    let addSubtractCompleteButton = childDiv.querySelectorAll('button');
    addSubtractCompleteButton.forEach(btn => {
        //Selecting all paragraph elements inside card container...
        let allPara = div.querySelectorAll('p');        
        btn.addEventListener('click', () => {            
            if(btn.innerText === 'Add') {
                if(item.numOfPagesRead < item.numOfPages) {
                    item.numOfPagesRead += 1;                
                    allPara[3].textContent = 'Completed : ' + item.numOfPagesRead;  
                }              
            } else if(btn.innerText === 'Subtract') {
                if(item.numOfPagesRead > 1) {
                    item.numOfPagesRead -= 1;                
                    allPara[3].textContent = 'Completed : ' + item.numOfPagesRead;
                }                            
            } else {
                item.numOfPagesRead = item.numOfPages;
                allPara[3].textContent = 'Completed : ' + item.numOfPagesRead;
            }
        });
    });
}

//Function to create new book object and add to myLibrary array...
function addBookToLibrary(title, author, numOfPages, numOfPagesRead) {
    let book = new Book(title, author, numOfPages, numOfPagesRead);
    myLibrary.push(book);
    localStorage.setItem('book', JSON.stringify(myLibrary));
}