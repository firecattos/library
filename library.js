const myLibrary=[];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;    
    this.pages = pages;
    this.read = read ? read:false;
    this.position = myLibrary.length; //Using length as index before pushing the object into the array
}

Book.prototype.addBook = function(){
    myLibrary.push(this);
}

Book.prototype.removeBook = function(index){
    myLibrary.splice(index, 1);
    bookDisplay(myLibrary);
    emptyChecker();
}

//Creates a book element in the array using the data provided through the input fields
function createBook(e){
    e.preventDefault();
    let newBookTitle=document.getElementById("newBookTitle").value;
    let newBookAuthor=document.getElementById("newBookAuthor").value;
    let newBookPages=document.getElementById("newBookPages").value;
    let newBookRead=isRead();
    if(document.querySelector("#newBookRead").value==="Read") newBookRead=true;
    let createBook=new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    createBook.addBook();
    bookDisplay(myLibrary);
    inputModal.style.display="none";
    document.querySelector("body").style.overflow="";
    newBook.reset();
}

//Creates a visual web card for each element in the books array
function bookDisplay(myLibrary){
    const bookshelf=document.getElementById("bookshelf"); 
    bookshelf.innerHTML="";
    myLibrary.forEach((book, index)=>{
        const bookCard=document.createElement("div");
        bookCard.className="book";
        const title=document.createElement("h5");
        title.textContent="\""+book.title+"\"";
        bookCard.appendChild(title);
        const author=document.createElement("p");
        author.textContent=book.author;
        bookCard.appendChild(author);
        const pages=document.createElement("p");
        pages.textContent=book.pages+" pages";
        bookCard.appendChild(pages);

        const buttonsDiv=document.createElement("div");
        buttonsDiv.className="buttonsDiv";
        const read=document.createElement("button");
        read.dataset.index=index;   //Using dataset for indexing book cards
        read.textContent=book.read ? "Read" : "Not read";
        read.style.backgroundColor=book.read ? "#00e600" : "";
        read.onclick=changeStatus;
        buttonsDiv.appendChild(read);
        const removeButton=document.createElement("button");
        removeButton.textContent="Remove";
        removeButton.onclick= ()=> book.removeBook(index);
        buttonsDiv.appendChild(removeButton);
        bookCard.appendChild(buttonsDiv);

        bookshelf.appendChild(bookCard);
    })
}

function emptyChecker(){
    const bookshelf=document.getElementById("bookshelf");
    if(bookshelf.innerHTML==="") bookshelf.innerHTML="<h3>No books available yet</h3>";
}

function isRead(){
    if(readChecker.value==="Read"){
        resetRead();
        return true;
    }
    return false;
}

function resetRead(){
    readChecker.value="Not read";
    readChecker.style.backgroundColor="";
}

//To exit the modal, just click anywhere outside of it
window.onclick=(e)=>{
    if(e.target==inputModal){
        inputModal.style.display="none";
        document.querySelector("body").style.overflow="";
        resetRead();
    }
}

//Changes the read status displayed in the book card
function changeStatus(e){
    const bookId=e.target.dataset.index;
    if(e.target.innerText==="Not read"){
        e.target.innerText="Read";
        e.target.style.backgroundColor="#00e600";
        myLibrary[bookId].read=true;
    }
    else if(e.target.innerText==="Read"){
        e.target.innerText="Not read";
        e.target.style.backgroundColor="";
        myLibrary[bookId].read=false;
    }
};

//When clicked, the createBook button displays an overlay with an input modal
const inputModal=document.getElementById("inputModal");
const addNewBook=document.getElementById("createBook");
addNewBook.addEventListener("click", ()=>{
    inputModal.style.display="flex";
    document.querySelector("body").style.overflow="hidden"
});

const newBook=document.getElementById("newBook");
newBook.addEventListener("submit", createBook); //"Add Book" button functionality

bookDisplay(myLibrary); //Display books

emptyChecker();

const readChecker=document.getElementById("newBookRead"); //Form's read button functionality
readChecker.addEventListener("click", ()=>{
    if(readChecker.value==="Not read"){
        readChecker.value="Read";
        readChecker.style.backgroundColor="#00e600";
    }
    else if(readChecker.value==="Read"){
        resetRead();
    }
});

//Test books
/*let book1=new Book("The art of war", "Sun Tzu", "1160", true);
book1.addBook();
let book2=new Book("The C++ programming language", "Bjarne Stroustrup", "1370");
book2.addBook();
let book3=new Book("book3", "testing", "333", true);
book3.addBook();*/

//make sure books are there for testing
/*myLibrary.forEach((book)=>{
    console.log("book: "+book.title+", "+book.author+", "+book.pages+", "+book.read);
})*/