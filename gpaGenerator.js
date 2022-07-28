const stdIdTxt = document.getElementById('stdIdTxt');
const stdNameTxt = document.getElementById('stdNameTxt');
const departmentTxt = document.getElementById('departmentTxt');
const facultyTxt = document.getElementById('facultyTxt');
const semesterTxt = document.getElementById('semester');
const sessionTxt = document.getElementById('session');

stdIdTxt.addEventListener('keyup', () =>{
    document.getElementById('stdIdDis').textContent = stdIdTxt.value;
})

stdNameTxt.addEventListener('keyup', () =>{
    document.getElementById('stdNameDis').textContent = stdNameTxt.value;
})

departmentTxt.addEventListener('onchange', () =>{
    document.getElementById('departmentDis').textContent = departmentTxt.value;
})

facultyTxt.addEventListener('keyup', () =>{
    document.getElementById('facultyDis').textContent = facultyTxt.value;
})

semesterTxt.addEventListener('keyup', () =>{
    document.getElementById('semesterDis').textContent = semesterTxt.value;
})

sessionTxt.addEventListener('keyup', () =>{
    document.getElementById('sessionDis').textContent = sessionTxt.value;
})

// populate the input course name with course code
function populateCourseName(){
    if(document.getElementById('courseCodeTxt').value === "CSC1201"){
        document.getElementById('courseNameTxt').value = "Introduction to computer science";
    }
    else if(document.getElementById('courseCodeTxt').value === "GSP1201"){
        document.getElementById('courseNameTxt').value = "Use of english";
    }
    else if(document.getElementById('courseCodeTxt').value === "ITC1301"){
        document.getElementById('courseNameTxt').value = "Information system I";
    }
    else if(document.getElementById('courseCodeTxt').value === "ITC1303"){
        document.getElementById('courseNameTxt').value = "Introduction to web programming";
    }
    else if(document.getElementById('courseCodeTxt').value === "MTH1301"){
        document.getElementById('courseNameTxt').value = "Elementary mathematics I";
    }
    else if(document.getElementById('courseCodeTxt').value === "STA1311"){
        document.getElementById('courseNameTxt').value = "Probability I";
    }
    else if(document.getElementById('courseCodeTxt').value === "ITC1211"){
        document.getElementById('courseNameTxt').value = "Open source applications";
    }
    else if(document.getElementById('courseCodeTxt').value === "ITC1342"){
        document.getElementById('courseNameTxt').value = "Programming methodology and abstraction";
    }
    else if(document.getElementById('courseCodeTxt').value === "ITC1302"){
        document.getElementById('courseNameTxt').value = "Introduction to computer programming";
    }

    
}

// The array that will take all the student's (object) credit and point
let creditAndPointArray = [];
const mapList = new Map();
let totalCreditRegistered = 0;
let totalPointsEarned = 0;
let gpa  = 0;

function addCourse(){

    const courseCode = document.getElementById('courseCodeTxt').value;
    const courseName = document.getElementById('courseNameTxt').value;
    const marks = document.getElementById('marksTxt').value;
    const credits = document.getElementById('creditTxt').value;
    const courseListTable = document.getElementById('courseList');

    // Creating the table row
    const itemTr = document.createElement('tr');


    // Creating the table elements
    const courseCodeTd = document.createElement('td');
    const courseNameTd = document.createElement('td');
    const marksTd = document.createElement('td');
    const creditsTd = document.createElement('td');
    const gradeTd = document.createElement('td');
    const coursePointsTd = document.createElement('td');
    
    //delete and update buttons
    const control = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    const updateBtn = document.createElement('button');
    updateBtn.innerText = "Update";


    let grade = '';
    let point = 0;


    // Converting the marks to grade and point
    if(marks < 40 && marks >= 0 ){
        grade = 'F';
        point = 0;
    }
    else if (marks < 45 ){
        grade = 'E';
        point = 1;
    }
    else if (marks < 50 ){
        grade = 'D';
        point = 2;
        
    }
    else if (marks < 60 ){
        grade = 'C';
        point = 3;
    }
    else if (marks < 70 ){
        grade = 'B';
        point = 4;
    }
    else if (marks <= 100 ){
        grade = 'A';
        point = 5;
    }
    else{
        grade = 'Invalid marks'
        point = 0;
    }

    // The student object
    const students = new Object();

    // setting each of the student course point and course credit
    students.course_point = point;
    students.course_crdt = +credits;
    
    // Pushing the student credit and point to the array
    creditAndPointArray.push(students)
    // console.log(pointsArray);

    // the product of credits and each points to give the total course point
    let coursePoints = []
    coursePoints = creditAndPointArray.map((student) =>{
        return student.course_point * student.course_crdt;

    })

    // Printing each couse point to the appropriate table data
    coursePoints.forEach((coursepoint) =>{
        coursePointsTd.textContent = coursepoint;

    })


    //Total Point Earned (TPE)
    totalPointsEarned += +coursePointsTd.textContent;
    const tpeDis = document.getElementById('tpeDis');
    tpeDis.textContent = totalPointsEarned;

    // TCE
    totalCreditRegistered += +credits
    const tcrDis = document.getElementById('tcrDis');
    tcrDis.textContent = totalCreditRegistered;

    // GPA computation
    gpa = totalPointsEarned/totalCreditRegistered;
    gpa = gpa.toFixed(2);

    const gpaDis = document.getElementById('gpaDis');
    gpaDis.textContent = gpa;

    //Mapping out data (JSON)
    const course = {"course_code": courseCode, "course_name": courseName, "course_mark": marks, "course_credit": credits };
    mapList.set(courseCode, course);


    //Clear input values
    document.getElementById('courseCodeTxt').value = '';
    document.getElementById('courseNameTxt').value = '';
    document.getElementById('marksTxt').value = '';
    document.getElementById('creditTxt').value = '';


    // setting each table element value
    courseCodeTd.textContent = courseCode;
    courseNameTd.textContent = courseName;
    marksTd.textContent = marks;
    creditsTd.textContent = credits;
    gradeTd.textContent = grade;

    // adding the table data to the table row
    control.appendChild(deleteBtn);
    control.appendChild(updateBtn);

    itemTr.appendChild(courseCodeTd);
    itemTr.appendChild(courseNameTd);
    itemTr.appendChild(marksTd);
    itemTr.appendChild(creditsTd);
    itemTr.appendChild(gradeTd);
    itemTr.appendChild(coursePointsTd);
    itemTr.appendChild(control);
    

    // adding table row to th data
    courseListTable.appendChild(itemTr);


    //delete button
    deleteBtn.addEventListener('click', ()=> {
        const row = deleteBtn.parentElement.parentElement;
        const courseCodeKey = row.firstChild.textContent;
        const removedCredits = row.children.item(3).textContent;
        const removedPoints = row.children.item(5).textContent;

        mapList.delete(courseCodeKey);
        courseListTable.removeChild(row);

        totalPointsEarned -= removedPoints;
        tpeDis.textContent = totalPointsEarned;

        totalCreditRegistered -= removedCredits;
        tcrDis.textContent = totalCreditRegistered;

        // Prevent GPA from becoming isNaN
        if(totalPointsEarned || totalCreditRegistered === 0){
            gpa = 0;
            gpaDis.textContent = 0;
        }
        else{
            gpa = totalPointsEarned/totalCreditRegistered;
            gpa = gpa.toFixed(2);
            gpaDis.textContent = gpa;

        }

    })

    updateBtn.addEventListener('click', ()=> {
        
        const row = updateBtn.parentElement.parentElement;
        const courseCodeKey = row.firstChild.textContent;
        const removedCredits = row.children.item(3).textContent;
        const removedPoints = row.children.item(5).textContent;

        mapList.delete(courseCodeKey);
        courseListTable.removeChild(row);
        
        totalPointsEarned -= removedPoints;
        tpeDis.textContent = totalPointsEarned;

        totalCreditRegistered -= removedCredits;
        tcrDis.textContent = totalCreditRegistered;

        // Prevent GPA from becoming isNaN
        if(totalPointsEarned || totalCreditRegistered === 0){
            gpa = 0;
            gpaDis.textContent = 0;
        }
        else{
            gpa = totalPointsEarned/totalCreditRegistered;
            gpa = gpa.toFixed(2);
            gpaDis.textContent = gpa;

        }

        document.getElementById('courseCodeTxt').value = courseCodeTd.textContent;
        document.getElementById('courseNameTxt').value = courseNameTd.textContent;
        document.getElementById('marksTxt').value = marksTd.textContent;
        document.getElementById('creditTxt').value = creditsTd.textContent;

    })

    

}


function saveReport(){
    const courseArray = [];
    const url = 'www.exzmple.com'

    for (let item of mapList){
        courseArray.push(item[1])
    }

    const report = {
        "student_id": stdIdTxt.value,
        "full_name": stdNameTxt.value,
        "department": departmentTxt.value,
        "faculty": facultyTxt.value,
        "semester": semesterTxt.value,
        "session": sessionTxt.value,
        "TCE": totalCreditRegistered,
        "TPE": totalPointsEarned,
        "gpa": gpa,
        "courses": courseArray

    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response){
        return response.text();
    }).then(function (text){
        console.log(text);
    }).then(function(error){
        console.error(error);

    })

    document.getElementById("disReport").textContent = JSON.stringify(report)
}