const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
  if (inputBox.value === '') {
    alert('Nothing? Really?');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value === '';
  saveData();
}
listContainer.addEventListener(
  'click',
  function (e) {
    console.log('Event Target:', e.target);

    if (e.target.tagName === 'LI') {
      console.log('Clicked LI');
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      console.log('Clicked SPAN');
      e.target.parentElement.remove();
      saveData();
    }
  },
  false,
);

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
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();

// notes

let createbox = document.querySelector('.createbox');
let notesContainer = document.querySelector('.notes');
let input = document.getElementById('UserInput');
let i = 0;

window.addEventListener('load', function () {
  let storedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
  storedNotes.forEach(function (noteText) {
    createSticky(noteText);
  });
});

createbox.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addSticky();
  }
});

document
  .getElementById('create-note-btn')
  .addEventListener('click', function () {
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
  const marginTop = notesContainer.children.length * 50 + 'px';

  let div = document.createElement('div');
  div.className = 'note';
  div.innerText = text;
  div.style = `background: ${color()};
	// margin-top: ${marginTop}
	`;
  div.draggable = true;

  //#region Drag and Drop
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  div.onmousedown = function onMouseDown(e) {
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = function onMouseUp() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    };

    document.onmousemove = function onMouseMove(e) {
      e.preventDefault();

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      div.style.top = `${div.offsetTop - pos2}px`;
      div.style.left = `${div.offsetLeft - pos1}px`;
    };
  };
  //#endregion Drag and Drop

  div.addEventListener('dblclick', function () {
    div.remove();
    removeNoteFromLocalStorage(text);
  });

  notesContainer.appendChild(div);
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
