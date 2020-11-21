import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        $(".loading").hide();
    }
    else {
        window.location.href = "../views/login.html";
    }
});



$("#studentDetailForm").on("submit", (evt) => {
    evt.preventDefault();
    console.log("clicked");
    let error = false;
    if (!$("#studentName").val()) {
        ShowError("Please enter Student Name");
        error = true;
    }
    if (!$("#studentCode").val()) {
        ShowError("Please enter Student Code");
        error = true;
    }
    if (!$("#collegeName").val()) {
        ShowError("Please enter College Name");
        error = true;
    }
    if (!$("#program").val()) {
        ShowError("Please enter Program");
        error = true;
    }
    if (error) {
        return;
    }
    const sUser = firebase.auth().currentUser.uid;
    const id = new Date().toISOString().replace(".", "_");
    console.log(sUser);
    let oData = {
        studentName: $("#studentName").val(),
        studentCode: $("#studentCode").val(),
        collegeName: $("#collegeName").val(),
        program: $("#program").val()
    };
    firebase.database().ref(`Students/${sUser}/${id}`).set(oData).then(() => {
        window.location.href = "dashboard.html";
    });
});
