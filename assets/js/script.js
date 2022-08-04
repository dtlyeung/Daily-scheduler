//variables for hour blocks (24hour clock)
var dayplan = [
    {
        hour: "0",
        time: "09",
        miltime: "09",
        meridiem: "am",
        task: ""
    },
    {
        hour: "1",
        time: "10",
        miltime: "10",
        meridiem: "am",
        task: ""
    },
    {
        hour: "2",
        time: "11",
        miltime: "11",
        meridiem: "am",
        task: ""
    },
    {
        hour: "3",
        time: "12",
        miltime: "12",
        meridiem: "pm",
        task: ""
    },
    {
        hour: "4",
        time: "01",
        miltime: "13",
        meridiem: "pm",
        task: ""
    },
    {
        hour: "5",
        time: "02",
        miltime: "14",
        meridiem: "pm",
        task: ""
    },
    {
        hour: "6",
        time: "03",
        miltime: "15",
        meridiem: "pm",
        task: ""
    },
    {
        hour: "7",
        time: "04",
        miltime: "16",
        meridiem: "pm",
        task: ""
    },
    {
        hour: "8",
        time: "05",
        miltime: "17",
        meridiem: "pm",
        task: ""
    },     
]

//Date at top
function headerdate(){
    var currentdate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentdate);
}

//save date to localstorage
function savedtasks(){
    localStorage.setItem("plannedDay", JSON.stringify(plannedDay));
}

//
function displaytasks(){
    plannedDay.foreach(function (currenthour){
        $(`#${currenthour.id}`).val(currenthour.reminder);
    })
}

//
function init(){
    var savedDay = JSON.parse(localStorage.getItem("plannedDay"));

    if (savedDay){
        plannedDay = savedDay;
    }

    taskreminder();
    plannedDay();
}

//Header date
headerdate();

//Scheduler body