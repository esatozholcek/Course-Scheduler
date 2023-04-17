var service = [];
var classroom = [];
var courses = [];
var busy = [];


function handleUpload() {
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
        var rows = csvData.split('\n');

        for (var i = 0; i < rows.length; i++) {
            let values = rows[i].split(';');
            var item = {
                courseID: values[0],
                day: values[1],
                time: values[2]
            };
            service.push(item);
        }
        resolve();
        }
    }

    if(picker2.files.length>0){
        reader2.readAsText(picker2.files[0]);
        reader2.onload = () => {
        let csv = reader2.result;
        let lines = csv.split("\n");

            lines.forEach(function (line) {
                let values = line.split(';');
                let item = {
                    ID: values[0],
                    capasity: values[1]
                };
                classroom.push(item);
            });
            for(let item of classroom) {
                console.log(item.ID);
            }
        };
    }

    if(picker3.files.length>0){
        reader3.readAsText(picker3.files[0]);
        reader3.onload = () => {
            let csv = reader3.result;
            let lines = csv.split("\n");

            lines.forEach(function (line) {
                let values = line.split(';');
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
            });
        };
    }

    if(picker4.files.length>0){
        reader4.readAsText(picker4.files[0]);
        reader4.onload = () => {
        let csv = reader4.result;
        let lines = csv.split("\n");

        lines.forEach(function (line) {
            let values = line.split(';');
            let item = {
                nameOfInstructor: values[0],
                day: values[1],
                time: values[2]
                };
            busy.push(item);
        });
        for(let item of busy) {
            console.log(item.time);
        }
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

// class Schedule {
//     constructor() { };

//     classroom = {
//         b414: undefined,
//         b313: undefined
//     };
//     time = {
//         Morning: classroom,
//         Afternoon: classroom
//     };
//     table = {
//         monday: time,
//         tuesday: time,
//         wednesday: time,
//         thursday: time,
//         friday: time,
//     };
// }


classroom = {
    b414: "math101",
    b313: undefined
};
time = {
    Morning: classroom,
    Afternoon: classroom
};
schedule = {
    monday: time,
    tuesday: time,
    wednesday: time,
    thursday: time,
    friday: time,
};

function myFunction() {
  handleUpload().then(function() {
    //const mySchedule = new Schedule();
    for(i=0;i<courses.length;i++)
    if(service[0]["courseID"] == courses[i]["courseID"])
        var capacity = courses[i]["capacity"]
    //if(schedule.table[service[0]["day"]][service[0]["time"]][]);
    console.log(service[0]);
    console.log(schedule["monday"]["Morning"]["b414"], "emir")







  }).catch(function(error) {
    console.error(error);
  });
}




var button = document.getElementById('uploadFile');
button.addEventListener("click", myFunction);
