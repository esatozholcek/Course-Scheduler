var services = [];
var classrooms = [];
var courses = [];
var busy = {};


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
        let lines = csv.split(/\r?\n/);

        // lines.forEach(function (line) {
        //     let values = line.split(';');
        //     let item = {
        //         nameOfInstructor: values[0],
        //         day: values[1],
        //         time: values[2]
        //         };
        //     busy.push(item);
        // });
        let item = {};
        lines.forEach(function (line) {
            let values = line.split(';');
            busy[values[0]] = {day: values[1],
                              time: values[2]};
        });
        // busy.push(item);
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

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var times = ["Morning", "Afternoon"];


var schedule = {
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
    },
};

function classroomAssign() {
    for (let day of days) {
        for (let time of times) {
            for(let i=0;i<classrooms.length; i++){
                schedule[day][time][classrooms[i]["ID"]] = undefined;
            }
        }
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
                    if(schedule[courses[i]["day"]][courses[i]["time"]][courses[i]["classroomID"]] == undefined) {
                        schedule[courses[i]["day"]][courses[i]["time"]][courses[i]["classroomID"]] = courses[i]["courseID"];
                        courses.splice(i, 1);
                    } else {
                        console.log("There is no way to make a schedule for the department.");
                    }
                    break;
                }
            }
        }
    }
}

async function myFunction() {
    await handleUpload();
    setTimeout(() => {
        classroomAssign();

        for(let service of services){
            setService(service);
        }
        // console.log(busy["OGR.GOR. YUSUF EVREN AYKAC"]);
        console.log(courses);
        console.log(schedule);
    })
    

}


var button = document.getElementById('uploadFile');
button.addEventListener("click", myFunction);
