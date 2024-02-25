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
