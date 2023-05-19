var services = [];
var classrooms = [];
var courses = [];
var busy = [];
var courses2 = [];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var times = ["Morning", "Afternoon"];
var schedule = {};


async function handleUpload() {
  return new Promise(function(resolve, reject) {
    var picker1 = document.getElementById("picker1"),
        picker2 = document.getElementById("picker2"),
        picker3 = document.getElementById("picker3"),
        picker4 = document.getElementById("picker4"),
        table = document.getElementById("table"),
        reader1 = new FileReader(),
        reader2 = new FileReader(),
        reader3 = new FileReader(),
        reader4 = new FileReader();


    if(picker1.files.length>0){
        reader1.readAsText(picker1.files[0]);
        reader1.onload = function() {
        var csvData = reader1.result;
        csvData = csvData.trim();
        var rows = csvData.split(/\r?\n/);

        for (var i = 0; i < rows.length; i++) {
            let values = rows[i].split(';');
            var item = {
                courseID: values[0],
                day: values[1],
                time: values[2]
            };
            services.push(item);
        }
        resolve();
        }
    }

    if(picker2.files.length>0){
        reader2.readAsText(picker2.files[0]);
        reader2.onload = function() {
        let csv = reader2.result;
        csv = csv.trim();
        let lines = csv.split(/\r?\n/);

            lines.forEach(function (line) {
                let values = line.split(';');
                let item = {
                    ID: values[0],
                    capacity: values[1]
                };
                classrooms.push(item);
            });
            classrooms.sort(function(a,b){return a.capacity - b.capacity});
            resolve();
        };
    }

    if(picker3.files.length>0){
        reader3.readAsText(picker3.files[0]);
        reader3.onload = () => {
            let csv = reader3.result;
            csv = csv.trim();
            let lines = csv.split(/\r?\n/);

            lines.forEach(function (line) {
                let values = line.split(';');
                if(values.length === 8) {
                let item = {
                    courseID: values[0],
                    name: values[1],
                    year: values[2],
                    credit: values[3],
                    compulsion: values[4],
                    departmantOrService: values[5],
                    capacity: values[6],
                    nameOfInstructor: values[7]
                };
                courses.push(item);
            }
            });
            resolve();
        };
    }

    if(picker4.files.length>0){
        reader4.readAsText(picker4.files[0]);
        reader4.onload = () => {
        let csv = reader4.result;
        csv = csv.trim();
        let lines = csv.split(/\r?\n/);

        lines.forEach(function (line) {
            let values = line.split(';');
            let item = {
                nameOfInstructor: values[0],
                day: values[1],
                time: values[2]
                };
            busy.push(item);
        });
        resolve();
        };
    }

    reader1.onerror = function() {
      reject(reader1.error);
    };

    reader2.onerror = function() {
      reject(reader2.error);
    };

    reader3.onerror = function() {
      reject(reader3.error);
    };

    reader4.onerror = function() {
      reject(reader4.error);
    };
  });
}





function setSchedule() {
    for (var i = 0; i < classrooms.length; i++) {
        schedule[classrooms[i]["ID"]] = {
            Monday: {
                Morning: {},
                Afternoon: {}
            },
            Tuesday: {
                Morning: {},
                Afternoon: {}
            },
            Wednesday: {
                Morning: {},
                Afternoon: {}
            },
            Thursday: {
                Morning: {},
                Afternoon: {}
            },
            Friday: {
                Morning: {},
                Afternoon: {}
            }
        };
    }
}



function setService(service) {
    for (let i=0; i<courses.length;i++) {
        if(courses[i]["courseID"] == service.courseID) {
            for(let j=0; j< classrooms.length; j++) {
                if (Number(classrooms[j]["capacity"]) >= Number(courses[i]["capacity"])) {
                    courses[i]["classroomID"] = classrooms[j]["ID"];
                    courses[i]["day"] = service.day;
                    courses[i]["time"] = service.time;
                    const len = Object.keys(schedule[courses[i]["classroomID"]][courses[i]["day"]][courses[i]["time"]]);
                    if(len.length == 0) {
                        schedule[courses[i]["classroomID"]][courses[i]["day"]][courses[i]["time"]]["courseID"] = courses[i]["courseID"];
                        courses2.push(courses[i]);
                        courses.splice(i, 1);
                    } else {
                        document.getElementById("error").innerHTML = "There is no way to make a schedule for the department.";
                    }
                    break;
                }
            }
        }
    }
}


function printTable() {
    for(let i=0; i<courses2.length; i++) {
        for(let j=0; j<classrooms.length; j++) {
            for (let k=0; k<5; k++) { 
                for(let t=0; t<2; t++) { 
                    if(schedule[classrooms[j]["ID"]][days[k]][times[t]]["courseID"] == courses2[i]["courseID"]) {
                        classNumber = courses2[i]["year"] - 1;
                        document.getElementById(k+""+t+""+classNumber+""+0).innerHTML = courses2[i]["courseID"];
                        document.getElementById(k+""+t+""+classNumber+""+1).innerHTML = courses2[i]["classroomID"];
                    }
                }
            }
        }
    }
}

function assignClassroomIDtoCourses() {
    for(let i=0; i<courses.length; i++) {
        for(let j=0 ; j<classrooms.length ; j++) {
            if (Number(classrooms[j]["capacity"]) >= Number(courses[i]["capacity"])) {
                courses[i]["classroomID"] = classrooms[j]["ID"];
                break;
            } else if(j == classrooms.length -1) {
                document.getElementById("advice").innerHTML = "There is no suitable classroom for this " + courses[i]["courseID"] + ".You should add classroom have more than " + courses[i]["capacity"] + ".";
            }
        }
    }
}


function isEmpty(day, time, year) {
    for (let i = 0; i < classrooms.length; i++) {
        if (schedule[classrooms[i]["ID"]][day][time]["courseID"] != undefined) {
            let str = schedule[classrooms[i]["ID"]][day][time]["courseID"];
            let num = str.replace(/^\D+/g, '');
            num = parseInt(num, 10);
            num = parseInt((num / 100), 10);
            if (num == year) {
                return false;
            }
        }
    }
    return true;
}


function setCourses() {
    for (let i = 0; i < classrooms.length; i++) {
        for (let j = 0; j < courses.length; j++) {
            for (let day = 0; day < days.length; day++) {
                for (let time = 0; time < times.length; time++) {
                    if (courses[j]["classroomID"] == classrooms[i]["ID"]) {
                        for (let k = 0; k < busy.length; k++) {
                            const len = Object.keys(schedule[classrooms[i]["ID"]][days[day]][times[time]]);
                            if (busy[k]["nameOfInstructor"] == courses[j]["nameOfInstructor"] && days[day] == busy[k]["day"] && times[time] == busy[k]["time"]) {
                                if (time == 0) {
                                    time++;
                                } else if(day<4){
                                    day++;
                                    time = 0
                                }
                            } else if (len.length != 0) {
                                if (time == 0) {
                                    time++;
                                } else if (day < 4) {
                                    day++;
                                    time = 0
                                }
                            } else if(!isEmpty(days[day], times[time], courses[j]["year"])) {
                                if (time == 0) {
                                    time++;
                                } else if (day < 4) {
                                    day++;
                                    time = 0
                                }
                            } else if(len.length == 0) {
                                schedule[classrooms[i]["ID"]][days[day]][times[time]]["courseID"] = courses[j]["courseID"];
                                courses2.push(courses[j]);
                                courses.splice(j, 1);
                                time = 1;
                                day = 4;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}


function start() {
    services = [];
    classrooms = [];
    courses = [];
    busy = [];
    courses2 = [];
    
}


async function main() {
    start();
    await handleUpload();
    setTimeout(() => {
        setSchedule();

        for(let service of services){
            setService(service);
        }
        let i=0;
        assignClassroomIDtoCourses();
        while (courses.length != 0) {            
            setCourses();
            setCourses();
            for (let j = 0; j < courses.length; j++) {
                for (let index = 0; index < classrooms.length; index++) {
                    if (courses[j]["classroomID"] == classrooms[index]["ID"] && index < classrooms.length - 1) {
                        courses[j]["classroomID"] = classrooms[++index]["ID"];
                        index++
                    }
                }
            }
            if(i == 5) {
                break;
            }
            i++;
        }
        printTable();
    })
}


var button = document.getElementById('uploadFile');
button.addEventListener("click", main);