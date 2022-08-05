var hourblock = document.getElementById("hourblock");
var currentDay = document.getElementById("currentDay");

//Display current date and time
function displaytime(){
    var date = moment().format('MMMM Do YYYY');
    currentDay.innerHTML = date;
    currentDay.innerHTML = "Today: " + date;
}
setInterval(displaytime, 1000);

let hours = [
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
]

//Make time blocks
timeblocks();
function timeblocks(){
    hourblock.innerHTML = "";

    for (var i = 0; i < hours.length; i++){
        var hourRows = hours[i];

        var row = document.createElement("div");
        row.classList.add("row");
        hourblock.appendChild(row);

        var hour = document.createElement("div");
        hour.innerHTML = hourRows;
        hour.classList.add("hour");
        row.appendChild(hour);

        var taskbox = document.createElement("textarea");
        taskbox.setAttribute("class", "description");
        taskbox.setAttribute("id", i);
        row.appendChild(taskbox);

        var saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("saveBtn");
        saveButton.setAttribute("value", i);
        row.appendChild(saveButton);
    }
}

// Save task to localStorage
$(document).on('click','.saveButton',function(){
    var savedtask = $(this).val();
    var taskdetails = document.getElementById(savedtask).value;
    localStorage.setItem(savedtask, taskdetails);
});

// Load saved tasks from localStorage
function retrieveTasks(){
    for (var i = 0; i < hours.length; i++){
        var retrievetasks = localStorage.getItem(i);
        var texts = document.getElementById(i);
        texts.innerText = retrievetasks;
    }
}
retrieveTasks();

// Clear saved tasks
function clearTasks(){
    var clearConfirm = confirm("Would you like to clear your schedule?")
    var storedtasks = document.getElementsByClassName("description")

    if (clearConfirm === true){
        for (var i = 0; i < storedtasks.length; i++){
            localStorage.removeItem(i);
        }
        storedtasks.innerText = "";
        timeblocks();
        changecolour();
    }
}

//Update hour block colours based on past, present, future time
function changecolour(){
    var presenttime = moment().format('h a');
    var presenthour = moment(presenttime, 'h a');
    var details = document.getElementsByClassName("description")

    for (var i = 0; i < details.length; i ++){
        var hourbox = moment(hours[i], 'h a');
        if (presenthour.isSame(hourbox) === true){
            details[i].classList.remove('past')
            details[i].classList.add('present')
            details[i].classList.remove('future')
        }
        else if (presenthour.isBefore(hourbox) === true){
            details[i].classList.remove('past')
            details[i].classList.remove('present')
            details[i].classList.add('future')
        }
        else if (presenthour.isAfter(hourbox) === true){
            details[i].classList.add('past')
            details[i].classList.remove('present')
            details[i].classList.remove('future')
        }
    }
}
changecolour()
setInterval(displaytime, 1000);