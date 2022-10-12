let myLibrary = [];
const btn = document.querySelector('#btn');
const btn2 = document.querySelector('#btn2');
const form = document.querySelector('#add-book');
const container = document.querySelector('#container');

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function displayBooks(arr) {
    container.textContent = '';

    for (let i = 0; i < arr.length; i++) {
        const card = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h3');
        const pages = document.createElement('h3');
        const read = document.createElement('h3');
        title.classList.add('title');
        author.classList.add('author');
        pages.classList.add('pages');
        read.classList.add('read');
        read.classList.add('sep');
        title.textContent = `${arr[i].title}`;
        author.textContent = `by ${arr[i].author}`;
        pages.textContent = `${arr[i].pages} pages`;
        read.textContent = `Read: ${arr[i].read}`;
        card.classList.add('card');
        card.style.cssText = 'background-color: coral; border: 2px solid red; padding: 10px;'
        
        container.appendChild(card);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('bookbtn');
        removeBtn.setAttribute('data-number', `${i}`);
        removeBtn.textContent = 'REMOVE';
        card.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            removeBook(removeBtn.dataset.number);
        })

        const changeBtn = document.createElement('button');
        changeBtn.classList.add('bookbtn');
        changeBtn.setAttribute('data-number', `${i}`);
        changeBtn.textContent = 'CHANGE READ STATUS';
        card.appendChild(changeBtn);

        changeBtn.addEventListener('click', () => {
            changeBook(changeBtn.dataset.number);
        })
    }
}

function changeBook(idx) {
    if (myLibrary[idx].read) {
        myLibrary[idx].read = false;
    } else {
        myLibrary[idx].read = true;
    }
    displayBooks(myLibrary);
}

function removeBook(idx) {
    myLibrary.splice(idx, 1);
    displayBooks(myLibrary);
}

// SHOW FORM
btn.addEventListener('click', () => {
    if (btn.classList.contains('on')) {
        form.style.cssText = 'display: none';
        btn.classList.toggle('on');
    } else {
        form.style.cssText = 'display: flex';
        btn.classList.toggle('on');
    }
});

// SEND FORM DATA AND DISPLAY BOOK
btn2.addEventListener('click', () => {
    let stat = 0;

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    if (title.validity.valueMissing || author.validity.valueMissing || pages.validity.valueMissing) {
        console.log('value is missing');
        stat = 1;
    }
    if (title.validity.tooShort || author.validity.tooShort) {
        console.log('enter 3 or more characters');
        stat = 1;
    }
    if (title.validity.patternMismatch || author.validity.patternMismatch) {
        console.log('enter letters');
        stat = 1;
    }
    if (pages.validity.patternMismatch) {
        console.log('enter a number');
        stat = 1;
    }

    if (stat != 1) {
        myLibrary.push(new Book(title.value, author.value, pages.value, read.checked));
        displayBooks(myLibrary);
    }
});
