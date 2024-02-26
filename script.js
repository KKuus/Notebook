const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === ''){
        alert("Nothing? Really?");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value === "";
    saveData();
}
listContainer.addEventListener("click", function(e){
    console.log("Event Target:", e.target); 

    if (e.target.tagName === "LI") {
        console.log("Clicked LI");
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        console.log("Clicked SPAN");
        e.target.parentElement.remove();
        saveData();
    }
}, false);

    // Doesnt work without console log lmao??
// listContainer.addEventListener("click", function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");
//         saveData();
//     } else if(e.target.tagname === "SPAN"){
//         e.target.parentElement.remove();
//         saveData();
//     }
// }, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

// notes 

let createbox = document.getElementsByClassName('createbox')[0];
let notesContainer = document.getElementsByClassName('notes')[0];
let input = document.getElementById('UserInput');
let i = 0;

window.addEventListener('load', function() {
    let storedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    storedNotes.forEach(function(noteText) {
        createSticky(noteText);
    });
});

createbox.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        addSticky();
    }
});

document.getElementById('create').addEventListener('click', function() {
    createbox.style.display = 'block';
});

function addSticky() {
    let text = input.value.trim();
    if (text !== '') {
        createSticky(text);
        saveToLocalStorage(text);
        input.value = '';
        createbox.style.display = 'none';
    }
}

function createSticky(text) {
    let div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = '<div class="details">' + '<h3>' + text + '<h3>' + '</div>';
    notesContainer.appendChild(div);

    div.addEventListener('dblclick', function() {
        div.remove();
        removeNoteFromLocalStorage(text);
    });

    div.setAttribute('style', 'background:' + color() + '');
}

function saveToLocalStorage(text) {
    let storedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    storedNotes.push(text);
    localStorage.setItem('stickyNotes', JSON.stringify(storedNotes));
}

function removeNoteFromLocalStorage(text) {
    let storedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    let index = storedNotes.indexOf(text);
    if (index > -1) {
        storedNotes.splice(index, 1);
        localStorage.setItem('stickyNotes', JSON.stringify(storedNotes));
    }
}

function color() {
    let randomColors = ['#B5C0D0', '#CCD3CA', '#F5E8DD', '#EED3D9'];
    if (i > randomColors.length - 1) {
        i = 0;
    }
    return randomColors[i++];
}
