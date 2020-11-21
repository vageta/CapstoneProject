function ShowError(errorMessage) {
    toastr.options = {
        timeOut: 2000
    };
    toastr.error(errorMessage);
}
function ShowSuccess(msg) {
    toastr.options = {
        timeOut: 2000
    };
    toastr.success(msg);
    window.location.href = "/ManageMenu";
}

$('#navSection').load('./nav.html');
