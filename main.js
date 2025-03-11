// capturando a o container da table e a tabela
const library = document.querySelector('.stand tbody');
const bookbox = document.querySelector('.bookForm');

// capturando os campos do formulario
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookGenre = document.querySelector('#genre');
const bookRead = document.querySelector('#read');

// pegando a primeira posição dos itens
bookGenre.selectedIndex = 0;
bookRead.selectedIndex = 0;


const myLibrary = [
	{"label":"86 Vol. 1, A War Without Casualties","author":"Asato Asato","genre":"Mecha","read":"Yes"},
	{"label":"86 Vol. 2, Run Through the Battlefront","author":"Asato Asato","genre":"Mecha","read":"No"},
	{"label":"Re:Zero Vol.1, The Waste Heat of the Beginning","author":"Tappei Nagatsuki","genre":"Fantasy","read":"No"},
	{"label":"Schindler's List","author":"Steven Zaillian","genre":"War","read":"Yes"}
];

// função construtora

function Book(title, author, genre, read) {
    this.label = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
}


// muda a cor e o icone do read
const changeColorIcon = function(color) {
    color.addEventListener('click', function() {
        if(color.style.color === "green") {
            color.innerHTML = "✘";
            color.style.color= "red";
        } else {
            color.innerHTML = "✔";
            color.style.color = "green";
        } 
    });
}
// função para remover um item da lista
const remover = function(del) {
    del.addEventListener("click", function() {
        del.closest('tr').remove();
    });
}

// função para adicionar livros ao array;
const addBook = function(book) {
    let NewBook = document.createElement("tr");
    let idBook = crypto.randomUUID();
    book.id = idBook;

    let valor = "";
    if(book.read == "Yes") {
        valor = "<td class='reading' style='color: green'>✔</td>";
    } else {
        valor = "<td class='reading' style='color: red'>✘</td>";
    }

    // adicionar o libro dentro da tabela
    // NewBook.innerHTML = "<td><div id='deleteBook'>⨯</div>" +book.label+ "</td><td>" +book.author+ "</td><td>" +book.genre+ "</td>" + valor;


    NewBook.innerHTML = "<td><div id='deleteBook'>⨯</div>" +book.label+ "</td><td>" +book.author+ "</td><td>" +book.genre+ "</td> "+valor;
    library.appendChild(NewBook);

    // permite ajustar o status de reading
    readStatusElement = NewBook.querySelector('.reading');
    changeColorIcon(readStatusElement);
    deleteBookElement = NewBook.querySelector('#deleteBook');
    remover(deleteBookElement);

}

myLibrary.forEach(book => addBook(book));

// mostra o formulario para adicionar livros
const displayPop = function() {
    bookbox.style.display = "block";
}

// reseta os campos do formulario e os reseta
const closePop = function() {
    bookTitle.value = 0;
    bookAuthor.value = 0;
    bookGenre.selectedIndex = "";
    bookRead.selectedIndex = "";
    bookbox.style.display = "none";
}

// exibe o form ao clicar no addBook e fecha ao clicar em close
document.getElementById('addBook').addEventListener('click',displayPop);
document.getElementById("close").addEventListener('click', closePop);


// adicionar novo livro ao clicar no botão

document.getElementById('addPlease').addEventListener('click', function(event) {
    const form = document.getElementById("form");
    event.preventDefault();
    
    // verificar os dados do form
    if(!form.reportValidity()) {
        return;
    }
    // cria um novo livro com os valores informados
    let NewBook = new Book (
        bookTitle.value,
        bookAuthor.value,
        bookGenre.value,
        bookRead.value
    );
    addBook(NewBook);
    closePop();      
});

