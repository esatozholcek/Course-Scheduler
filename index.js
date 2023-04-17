window.onload = () => {
    var reader = new FileReader,
        picker1 = document.getElementById("picker1"),
        picker2 = document.getElementById("picker2");
        picker3 = document.getElementById("picker3");
        picker4 = document.getElementById("picker4");
        table = document.getElementById("table");

    picker1.onchange = () => reader.readAsText(picker1.files[0]);
    let service = [];
    reader.onloadend = () => {
        let csv = reader.result;
        let lines = csv.split("\n");


        lines.forEach(function (line) {
            let values = line.split(';');
            let item = {
                course: values[0],
                day: values[1],
                time: values[2]
            };
            service.push(item);
        });

        for(let item of service) {
            console.log(item.course);
        }
    };

    picker2.onchange = () => reader.readAsText(picker2.files[0]);
    let classroom = [];
    reader.onloadend = () => {
        let csv = reader.result;
        let lines = csv.split("\n");


        lines.forEach(function (line) {
            let values = line.split(';');
            let item = {
                ID: values[0],
                capasity: values[1]
            };
            classroom.push(item);
        });
        for(let item of service) {
            console.log(item.ID);
        }
    };


    picker3.onchange = () => reader.readAsText(picker3.files[0]);
    let courses = [];
    reader.onloadend = () => {
        let csv = reader.result;
        let lines = csv.split("\n");


        lines.forEach(function (line) {
            let values = line.split(';');
            let item = {
                ID: values[0],
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


    picker4.onchange = () => reader.readAsText(picker4.files[0]);
    let busy = [];
    reader.onloadend = () => {
        let csv = reader.result;
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
        console.log(typeof courses);
        console.log(courses.length);
            console.log(service.length);
            console.log(classroom.length);
        if(courses.length !== 0 && classroom.length !== 0 && service.length !== 0){
            console.log("grdgkdgrdgdrld");
            console.log(courses.length);
            console.log(service.length);
            console.log(classroom.length);
        }
        
    };
    for(let item of busy) {
        console.log(item.day);
    }
    
};
