import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";
import config from "./firebase.js";

firebase.initializeApp(config);



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        $("#user-login").html(user.email);
    } else {
        console.log("logged out");
    }
});


$("#loginForm").on("submit", (evt) => {
    evt.preventDefault();
    let data = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(
        () => {
            window.location.href = "dashboard.html";
        }
    ).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#signInError").html("Error : Invalid username and password");
        console.log(errorCode + " error " + errorMessage);
    });

});

$("#signUpForm").on("submit", (evt) => {
    evt.preventDefault();
    console.log("signUpClicked");
    //alert("clicked Sign Up: " + JSON.stringify(formData));
    // firebase.auth().createUserWithEmailAndPassword(formData.username, formData.password).then(
    //     () => {
    //         // could save extra info in a profile here I think.
    //         app.loginScreen.close(".signupYes", true);
    //     }
    // ).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     $$("#signUpError").html(errorCode + " error " + errorMessage)
    //     console.log(errorCode + " error " + errorMessage);
    //     // ...
    // });

});
$("#logout").on("click", (evt) => {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        window.location.href = "./login.html";
    }).catch(() => {
        window.location.href = "./login.html";
    });
});