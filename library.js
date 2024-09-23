const myLibrary=[];


function Book(title, author, pages, read){ //add genre and date of publication maybe
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

Book.prototype.removeBook = function(index){
    console.log("Test removeBook called from book "+index);
    myLibrary.splice(index, 1);
    bookDisplay(myLibrary);
    emptyChecker();
}

Book.prototype.displayBook = function(){
    console.log("test display, book "+this.position);
}

const newBook=document.getElementById("newBook");
/*newBook.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Prevented Default");
});*/
newBook.addEventListener("submit", createBook);

//is <dialog> worth? check

function createBook(e){
    e.preventDefault();
    console.log("Prevented Default 1");
    let newBookTitle=document.getElementById("newBookTitle").value;
    let newBookAuthor=document.getElementById("newBookAuthor").value;
    let newBookPages=document.getElementById("newBookPages").value;
    //let newBookRead=document.getElementById("newBookRead").checked;
    let newBookRead=isRead(); //TEST
    if(document.querySelector("#newBookRead").value==="Read") newBookRead=true;
    console.log("book: "+newBookTitle+", "+newBookAuthor+", "+newBookPages+", "+newBookRead);
    let createBook=new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    createBook.addBook();

    bookDisplay(myLibrary);

    inputModal.style.display="none";
    newBook.reset();
}

//Test books
/*let book1=new Book("The art of war", "Sun Tzu", "1160", true);
book1.addBook();
let book2=new Book("The C++ programming language", "Bjarne Stroustrup", "1370");
book2.addBook();
let book3=new Book("book3", "testing", "333", true);
book3.addBook();*/

//make sure books are there for testing
myLibrary.forEach((book)=>{
    console.log("book: "+book.title+", "+book.author+", "+book.pages+", "+book.read);
})

function bookDisplay(myLibrary){
    const bookshelf=document.getElementById("bookshelf");
    
    bookshelf.innerHTML="";

    //while(bookshelf.firstChild) bookshelf.removeChild(firstChild);

    myLibrary.forEach((book, index)=>{
        const bookCard=document.createElement("div");
        bookCard.className="book";
        //bookCard.dataset.index=index;

        const title=document.createElement("h5");    //test h5
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
        //read.id="readStatus";
        read.dataset.index=index;
        read.textContent=book.read ? "Read" : "Not read";
        read.style.backgroundColor=book.read ? "#00e600" : "";
        //read.addEventListener("click", changeStatus);
        read.onclick=changeStatus;
        buttonsDiv.appendChild(read);
        
        const removeButton=document.createElement("button");
        removeButton.textContent="Remove";
        removeButton.onclick= ()=>{
            book.removeBook(index);
        };
        buttonsDiv.appendChild(removeButton);

        bookCard.appendChild(buttonsDiv);
        //after everything:
        bookshelf.appendChild(bookCard);
    })
}

bookDisplay(myLibrary); //Display test books

function emptyChecker(){
    const bookshelf=document.getElementById("bookshelf");
    if(bookshelf.innerHTML==="") bookshelf.innerHTML="<h3>No books available yet</h3>";
}
emptyChecker();
/*const noBooksTest=document.getElementById("bookshelf"); //created function
if(noBooksTest.innerHTML===""){
    const noBooks=document.createElement("h3");
    noBooks.textContent="No books available yet";
    noBooksTest.appendChild(noBooks);
}*/

const inputModal=document.getElementById("inputModal"); //reused
//When clicked, this button makes an overlay with the modal appear
const addNewBook=document.getElementById("createBook");
addNewBook.addEventListener("click", ()=>{
    inputModal.style.display="block";
    //inputModal.showModal();
});
/*  <DIALOG> TESTING*/
const readChecker=document.getElementById("newBookRead"); //Read button in form functionality
readChecker.addEventListener("click", ()=>{
//readChecker.onclick=changeStatus;
    if(readChecker.value==="Not read"){
        readChecker.value="Read";
        readChecker.style.backgroundColor="#00e600";
    }
    else if(readChecker.value==="Read"){
        /*readChecker.value="Not read";
        readChecker.style.backgroundColor="";*/
        resetRead();
    }
});

function isRead(){
    if(readChecker.value==="Read"){
        resetRead();
        return true;
    }
    else return false;
}

function resetRead(){
    readChecker.value="Not read";
    readChecker.style.backgroundColor="";
}

//To exit the modal, just click anywhere outside of its elements
window.onclick=(e)=>{
    if(e.target==inputModal){
        inputModal.style.display="none";
        resetRead();
    }
}/**///commented for testing with <dialog>

function changeStatus(e){ //Changes the read status displayed in the book card
    //const bookId=e.target.getAttribute("data-index");
    const bookId=e.target.dataset.index;
    console.log("changeStatus invoked, book "+bookId);
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

//const index = e.target.getAttribute('data-index'); // Retrieve the index from the button

//listBtn function
/*const listBooksBtn=document.getElementById("listBtn");
listBooksBtn.addEventListener("click", listBooks);

function listBooks(e){
    for(let i=0; i<myLibrary.length; i++) myLibrary[i].displayBook();
}*/