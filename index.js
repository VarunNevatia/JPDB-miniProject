var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var connToken = "90935104|-31949240770569643|90903678";

function disableFields() {
    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollDate").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
}

function enableFields() {
    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollDate").prop("disabled", false);
}

function resetForm() {
    $("#studentForm")[0].reset();
    $("#rollNo").prop("disabled", false);

    disableFields();
    $("#rollNo").focus();
}

function validateForm() {
    if ($("#rollNo").val() === "" ||
            $("#fullName").val() === "" ||
            $("#studentClass").val() === "" ||
            $("#birthDate").val() === "" ||
            $("#address").val() === "" ||
            $("#enrollDate").val() === "") {
        alert("All fields required");
        return false;
    }
    return true;
}

function getStudent() {
    var roll = $("#rollNo").val();

    var req = createGET_BY_KEYRequest(connToken, dbName, relName,
            JSON.stringify({"Roll-No": roll}));

    jQuery.ajaxSetup({async: false});
    var result = executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (result.status === 400) {
        enableFields();
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#fullName").focus();
    } else {
        var data = JSON.parse(result.data).record;

        $("#fullName").val(data["Full-Name"]);
        $("#studentClass").val(data["Class"]);
        $("#birthDate").val(data["Birth-Date"]);
        $("#address").val(data["Address"]);
        $("#enrollDate").val(data["Enrollment-Date"]);

        enableFields();
        $("#rollNo").prop("disabled", true);

        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
    }
}

function saveData() {
    if (!validateForm())
        return;

    var jsonStr = {
        "Roll-No": $("#rollNo").val(),
        "Full-Name": $("#fullName").val(),
        "Class": $("#studentClass").val(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val(),
        "Enrollment-Date": $("#enrollDate").val()
    };

    var req = createPUTRequest(connToken, JSON.stringify(jsonStr), dbName, relName);

    jQuery.ajaxSetup({async: false});
    executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    alert("Student Saved");
    resetForm();
}

function updateData() {
    if (!validateForm())
        return;

    var jsonStr = {
        "Roll-No": $("#rollNo").val(),
        "Full-Name": $("#fullName").val(),
        "Class": $("#studentClass").val(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val(),
        "Enrollment-Date": $("#enrollDate").val()
    };

    var req = createUPDATERecordRequest(connToken,
            JSON.stringify(jsonStr), dbName, relName, $("#rollNo").val());

    jQuery.ajaxSetup({async: false});
    executeCommandAtGivenBaseUrl(req, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});

    alert("Student Updated");
    resetForm();
}

resetForm();

