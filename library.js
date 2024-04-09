const myLibrary=[];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;    
    this.pages = pages;
    this.read = read ? read:false;
    this.position = myLibrary.length; //Use length as index before pushing the object into the array
}

Book.prototype.addBook = function(){
    myLibrary.push(this);

    console.log("Book added");
}

Book.prototype.removeBook = function(){}

Book.prototype.displayBooks = function(){}

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
}