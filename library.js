const myLibrary=[];


function Book(title, author, pages, read){ //add genre maybe
    this.title = title;
    this.author = author;    
    this.pages = pages;
    this.read = read ? read:false;
    this.position = myLibrary.length; //Use length as index before pushing the object into the array
}

Book.prototype.addBook = function(){
    myLibrary.push(this);

    console.log("Book added");
} /*modal -> form? -> onClick?
https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/

https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/
*/

Book.prototype.removeBook = function(){}

Book.prototype.displayBook = function(){
    console.log("test display, book "+this.position);
}

const newBook=document.getElementById("newBook");
/*newBook.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Prevented Default");
});*/
newBook.addEventListener("submit", createBook);

function createBook(e){
    e.preventDefault();
    console.log("Prevented Default 1");
    let newBookTitle=document.getElementById("newBookTitle").value;
    let newBookAuthor=document.getElementById("newBookAuthor").value;
    let newBookPages=document.getElementById("newBookPages").value;
    let newBookRead=document.getElementById("newBookRead").checked;
    console.log("book: "+newBookTitle+", "+newBookAuthor+", "+newBookPages+", "+newBookRead);
    let createBook=new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    createBook.addBook();

    bookDisplay(myLibrary);

    inputModal.style.display="none";
}

//Test books
let book1=new Book("book1", "testing", "111", true);
book1.addBook();
let book2=new Book("book2", "testing", "222");
book2.addBook();
let book3=new Book("book3", "testing", "333", true);
book3.addBook();

//make sure books are there for testing
myLibrary.forEach((book)=>{
    console.log("book: "+book.title+", "+book.author+", "+book.pages+", "+book.read);
})

function bookDisplay(myLibrary){
    const bookshelf=document.getElementById("bookshelf");
    
    bookshelf.innerHTML="";

    //while(bookshelf.firstChild) bookshelf.removeChild(firstChild);

    myLibrary.forEach((book)=>{
        const bookCard=document.createElement("div");
        bookCard.className="book";

        const title=document.createElement("h3");
        title.textContent=book.title;
        bookCard.appendChild(title);
        const author=document.createElement("p");
        author.textContent=book.author;
        bookCard.appendChild(author);
        const pages=document.createElement("p");
        pages.textContent=book.pages;
        bookCard.appendChild(pages);
        const read=document.createElement("p");
        read.textContent=book.read ? "Read" : "Not read";
        bookCard.appendChild(read);
        //after everything:
        bookshelf.appendChild(bookCard);
    })
}

bookDisplay(myLibrary); //Display test books

const inputModal=document.getElementById("inputModal");
//When clicked, this button makes an overlay with the modal appear
const addNewBook=document.getElementById("createBook");
addNewBook.addEventListener("click", ()=>{
    inputModal.style.display="block";
});

//To exit the modal, just click anywhere outside of its elements
window.onclick=(e)=>{
    if(e.target==inputModal) inputModal.style.display="none";
}

//listBtn function
/*const listBooksBtn=document.getElementById("listBtn");
listBooksBtn.addEventListener("click", listBooks);

function listBooks(e){
    for(let i=0; i<myLibrary.length; i++) myLibrary[i].displayBook();
}*/