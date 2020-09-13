//TODO: Handle wrong data type inputs!!!!
//TODO: What if I submit a person, then resubmit that person? USE the COMPANY'S STR ID TO HANDLE THIS LOGIC

const objEmployees = {}; //this object should be constant so we don't lose valuable data
let globalTotalCosts = 0;
let globalEmployeePrimaryKeyID = 0; //this allows for each employee added to be uniquely identified

//need to create ids for delete button
$(document).ready(() => {
  //onSubmit function
  $("#employee-form").on("submit", (e) => {
    //prevent page from refreshing
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
        <td>$${Number($("#employee-salary").val()).toLocaleString()}</td>
        <td>${`<button class='btn btn-danger delete-button' id=${globalEmployeePrimaryKeyID++}>Delete</button>`}</td> 
    </tr>`);

      //update total monthly costs on the DOM
      $("#total-monthly-cost").text(
        `Total Monthly: $${getMonthlyCosts().toLocaleString()}`
      );
      if (isOverBudget()) {
        //add class
        $("#total-monthly-cost").addClass("alert alert-danger");
      }
    }
    //clear inputs when form submitted
    $('input[type="text"]').val("");
  }); //end of on-submit event

  //filter click events to only of the class, .delete-button
  $("body").on("click", ".delete-button", (e) => {
    inactivateEmployee(Number(e.target.id), objEmployees);
    $(e.target).closest("tr").remove();

    //update total monthly on the DOM
    $("#total-monthly-cost").text(
      `Total Monthly: $${getMonthlyCosts().toLocaleString()}`
    );
    if (!isOverBudget()) {
      $("#total-monthly-cost").removeClass("alert alert-danger");
    }
  }); //end of delete button on-click event
}); //end of document.ready()

//function to add an employee to object of employees with a unique ID
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

// check if company is over budget
const isOverBudget = () => {
  return globalTotalCosts > 240000; // 20,000 = total / 12
};
