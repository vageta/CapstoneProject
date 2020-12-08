import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";

let studentId = null;

function init() {
    const sUser = firebase.auth().currentUser.uid;
    $(".loading").hide();
    firebase.database().ref("Students/" + sUser).on("value", (snapshot) => {
        console.log(snapshot);
        const oItems = snapshot.val();
        const aKeys = oItems != null ? Object.keys(oItems) : [];
        $("#datatable").html("");
       
        for (let n = 0; n < aKeys.length; n++) {
            let row =
                `<tr id="${oItems[aKeys[n]].studentCode}">
          <td>${oItems[aKeys[n]].studentName}</td>
          <td>${oItems[aKeys[n]].studentCode}</td>
          <td>${oItems[aKeys[n]].collegeName}</td>
          <td>${oItems[aKeys[n]].program}</td>
          <td><button id="d${aKeys[n]}" class="delete btn btn-sm btn-danger">Delete</button>
              <button id="u${aKeys[n]}" class="update btn btn-sm btn-primary">Update Schedule</button></td>
                </tr>`;
            $("#datatable").append(row);
        }
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        init();
    }
    else {
        window.location.href = "../views/login.html";
    }
});

$("#datatable").on("click", (evt) => {
    const sUser = firebase.auth().currentUser.uid;
    let tarId = evt.target.id;
    if (tarId[0] == 'd') {
        firebase.database().ref(`Students/${sUser}/${tarId.substr(1)}`).remove();
    }
});
$("#datatable").on("click", (evt) => {

    studentId = evt.target.id.substr(1);
    if (studentId) {
        const sUser = firebase.auth().currentUser.uid;
        let studentCode = evt.target.closest('td').closest('tr').id;
        const db = firebase.database().ref('Students');
        //getting student details
        const eventsRef = db.child(sUser);
        let query = eventsRef.orderByChild('studentCode')
            .equalTo(studentCode)
            .limitToFirst(1);

        query.once('value', (snapshot) => {
            let data = snapshot.val();
            let key = Object.keys(data);
            $("#studentName").html(data[key].studentName);
            $("#studentCode").html(data[key].studentCode);
            $("#collegeName").html(data[key].collegeName);
            $("#program").html(data[key].program);
        });
        //  getting student course details

        const courseRef = firebase.database().ref(`CourseDetails/${sUser}`)
            .orderByChild('studentId')
            .equalTo(studentId);
        courseRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            $("#courseDataTable").html("");
            let oItems = snapshot.val();
            if (oItems != null) {

                const aKeys = oItems != null ? Object.keys(oItems) : [];
                for (let n = 0; n < aKeys.length; n++) {
                    let row =
                        `<tr id="${oItems[aKeys[n]].name}">
                    <td>${oItems[aKeys[n]].name}</td>
                    <td>${oItems[aKeys[n]].day}</td>
                    <td>${oItems[aKeys[n]].startTime}</td>
                    <td>${oItems[aKeys[n]].duration}</td>
                    <td>${oItems[aKeys[n]].roomNo}</td>
                    <td>${oItems[aKeys[n]].url}</td>
                    <td>
                        <button id="d${aKeys[n]}" class="deleteCourse btn btn-sm btn-danger">Delete</button>
                    </td>
                    </tr>`;
                    $("#courseDataTable").append(row);
                }
            }
        });


        $("#menuModal").modal('show');
    }
});



$("#addCourseDetailButton").on("click", (evt) => {
    //courseDataTable
    const sUser = firebase.auth().currentUser.uid;
    const id = new Date().toISOString().replace(".", "_");
    let sData = {
        name: $("#courseName").val(),
        day: $("#weekDay").val(),
        startTime: $("#startTime").val(),
        duration: $("#duration").val(),
        roomNo: $("#roomNo").val(),
        url: $("#url").val(),
        studentId: studentId
    };
    console.log(sData);
    firebase.database().ref(`CourseDetails/${sUser}/${id}`).set(sData).then(() => {
        // window.location.href = "dashboard.html";
        $("#courseName").val("");
        $("#weekDay").val("");
        $("#startTime").val("");
        $("#duration").val("");
        $("#roomNo").val("");
        $("#url").val("");
    });
});

$(".closeModal").on("click", (evt) => {
    $("#menuModal").modal('hide');
});


$("#courseDataTable").on("click", (evt) => {
    const sUser = firebase.auth().currentUser.uid;
    let tarId = evt.target.id;
    if (tarId[0] == 'd') {
        firebase.database().ref(`CourseDetails/${sUser}/${tarId.substr(1)}`).remove();
    }
});