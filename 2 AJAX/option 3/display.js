$(document).ready(function () {
  getData();
});

function getData() {
  let localStorageData = localStorage.getItem("student");
  let studentObj = JSON.parse(localStorageData);
  console.log(studentObj);

  // Use .val() instead of .text() for form elements
  $("#rollno").text(studentObj.rollno);
  $("#firstName").text(studentObj.firstName);
  $("#lastName").text(studentObj.lastName);
  $("#dob").text(studentObj.dob);
  $("#gender").text(studentObj.gender);
  $("#email").text(studentObj.email);
  $("#contactNo").text(studentObj.contactNo);
  $("#branch").text(studentObj.branch);
  $("#registrationDate").text(studentObj.registrationDate);
  $("#parentName").text(studentObj.parentName);
  $("#parentContactNo").text(studentObj.parentMobileNo);
}
