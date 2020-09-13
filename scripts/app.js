let primaryKeyId = 0; //this allows for each employee added to be uniquely identified
const objEmployees = {}; //this object should be constant so we don't lose valuable data
let totalCosts = 0;

//TODO: package onsubmit callback
//need to create ids for delete button
$(document).ready(() => {
  //onSubmit function
  $("#employee-form").on("submit", (e) => {
    e.preventDefault();
    console.log(typeof $("#employee-salary").val());
    //if nothing is passed, alert the user
    if (
      //if any inputs are blank
      $("#employee-ID").val() === "" ||
      $("#employee-first-name").val() === "" ||
      $("#employee-last-name").val() === "" ||
      $("#employee-title").val() === "" ||
      $("#employee-salary").val() === ""
    ) {
      alert("Error: please provide input for all fields!");
    } else {
      //add employee to object of employees
      addEmployee(
        $("#employee-ID").val(),
        $("#employee-first-name").val(),
        $("#employee-last-name").val(),
        $("#employee-title").val(),
        $("#employee-salary").val(),
        primaryKeyId
      );

      //append employee data to table
      //first return the primaryKeyId and THEN increment
      $("#employee-table-body").append(`<tr>
        <td>${$("#employee-ID").val()}</td>
        <td>${$("#employee-first-name").val()}</td>
        <td>${$("#employee-last-name").val()}</td>
        <td>${$("#employee-title").val()}</td>
        <td>${$("#employee-salary").val()}</td>
        <td>${`<button class='btn btn-danger delete-button' id=${primaryKeyId++}>Delete</button>`}</td> 
    </tr>`);

      //update total monthly costs
      $("#total-monthly-cost").text(
        `Total Monthly: $${getMonthlyCosts($("#employee-salary").val())}`
      );
    }
    //clear inputs when form submitted
    $('input[type="text"]').val("");
  });

  //TODO: finish delete method
  //filter click events to only of the class, .delete-button
  $("body").on("click", ".delete-button", (e) => {
    //make sure to decrement primaryKeyId
    console.log(e.target);
  });
});

//function to add an employee to object of employees
//this implementation was utilized because order is unneccessary that an array confers
//fast access/insertion/removal is needed
const addEmployee = (
  employeeID,
  firstName,
  lastName,
  title,
  salary,
  primaryKeyId
) => {
  //insert employee into object of employees with unique ID
  objEmployees[primaryKeyId] = {
    employeeID,
    firstName,
    lastName,
    title,
    salary,
  };
};

//convert input salary to number, update global variable, and convert number to a monthly cost
const getMonthlyCosts = (employeeSalary) => {
  totalCosts += Number(employeeSalary);
  return Math.round((totalCosts / 12) * 100) / 100;
};
