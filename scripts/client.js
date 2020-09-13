//TODO: If the total monthly cost exceeds $20,000, add a red background color to the total monthly cost.
//TODO: package onsubmit callback
//TODO: What if I submit a person, then resubmit that person? USE the COMPANY'S STR ID TO HANDLE THIS LOGIC
//TODO: Handle wrong data type inputs
//TODO: add commas to numbers on UI

let globalEmployeePrimaryKeyID = 0; //this allows for each employee added to be uniquely identified
const objEmployees = {}; //this object should be constant so we don't lose valuable data
let globalTotalCosts = 0;

//need to create ids for delete button
$(document).ready(() => {
  //onSubmit function
  $("#employee-form").on("submit", (e) => {
    e.preventDefault();
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
        Number($("#employee-ID").val()),
        $("#employee-first-name").val(),
        $("#employee-last-name").val(),
        $("#employee-title").val(),
        Number($("#employee-salary").val()),
        objEmployees
      );

      //append employee data to table
      //first return the globalEmployeePrimaryKeyID and THEN increment
      $("#employee-table-body").append(`<tr>
        <td>${$("#employee-ID").val()}</td>
        <td>${$("#employee-first-name").val()}</td>
        <td>${$("#employee-last-name").val()}</td>
        <td>${$("#employee-title").val()}</td>
        <td>${$("#employee-salary").val()}</td>
        <td>${`<button class='btn btn-danger delete-button' id=${globalEmployeePrimaryKeyID++}>Delete</button>`}</td> 
    </tr>`);

      //update total monthly costs
      $("#total-monthly-cost").text(`Total Monthly: $${getMonthlyCosts()}`);
    }
    //clear inputs when form submitted
    $('input[type="text"]').val("");
  });

  //filter click events to only of the class, .delete-button
  $("body").on("click", ".delete-button", (e) => {
    inactivateEmployee(Number(e.target.id), objEmployees);
    $(e.target).closest("tr").remove();
    //update Total Monthly on the DOM:
    $("#total-monthly-cost").text(`Total Monthly: $${getMonthlyCosts()}`);
  });
});

//function to add an employee to object of employees
//this implementation was utilized because order is unneccessary
//fast access/insertion/removal is needed
const addEmployee = (
  pnumEmployeeID,
  pstrFirstName,
  pstrLastName,
  pstrTitle,
  pnumSalary,
  pobjEmployees
) => {
  //insert employee into object of employees with unique ID
  pobjEmployees[globalEmployeePrimaryKeyID] = {
    numEmployeeID: pnumEmployeeID,
    strFirstName: pstrFirstName,
    strLastName: pstrLastName,
    strTitle: pstrTitle,
    numSalary: pnumSalary,
    blnActive: true,
  };
  globalTotalCosts += pnumSalary;
};

//employees should remain in our database for future purposes
//render them inactive instead
const inactivateEmployee = (pnumEmployeePrimaryKey, pobjEmployees) => {
  pobjEmployees[pnumEmployeePrimaryKey].blnActive = false;
  globalTotalCosts -= pobjEmployees[pnumEmployeePrimaryKey].numSalary;
};

//use global globalTotalCosts to get the montly costs
const getMonthlyCosts = () => {
  return Math.round((globalTotalCosts / 12) * 100) / 100;
};
