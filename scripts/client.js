//##################################################################################################################
//Global declarations
//##################################################################################################################

const objEmployees = {}; //this object should be constant so we don't lose valuable data
const regexTestForOnlyDigits = /[^0-9]/;
const globalarrEmployeeIDs = [];
let globalTotalCosts = 0;
let globalEmployeePrimaryKeyID = 0; //this allows for each employee added to be uniquely identified

//##################################################################################################################
//Events: submit and delete
//##################################################################################################################

$(document).ready(() => {
  //onSubmit function
  $("#employee-form").on("submit", (e) => {
    //prevent page from refreshing
    e.preventDefault();

    if (
      //if any inputs are blank, alert user
      $("#employee-ID").val() === "" ||
      $("#employee-first-name").val() === "" ||
      $("#employee-last-name").val() === "" ||
      $("#employee-title").val() === "" ||
      $("#employee-salary").val() === ""
    ) {
      alert("Error: please provide input for all fields!");
    } else if (
      //for validation and functionality purposes, these fields must contain only numbers
      regexTestForOnlyDigits.test($("#employee-salary").val()) ||
      regexTestForOnlyDigits.test($("#employee-ID").val())
    ) {
      alert("Salaries and Employee IDs can only contain digits!");
    } else if (
      //don't allow company IDs that match to be added
      doesEmployeeIDExist(Number($("#employee-ID").val()), globalarrEmployeeIDs)
    ) {
      alert("Error: The employee ID you inputted already exists!");
    } else {
      //tests all passed, add data
      addEmployeeToDatabase(
        Number($("#employee-ID").val()),
        $("#employee-first-name").val(),
        $("#employee-last-name").val(),
        $("#employee-title").val(),
        Number($("#employee-salary").val()),
        globalarrEmployeeIDs,
        objEmployees
      );

      //append employee to table
      //note the post-fix increment: first return the globalEmployeePrimaryKeyID and THEN increment
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
        $("#total-monthly-cost").addClass("alert alert-danger");
      }
      //clear inputs when form submitted
      $('input[type="text"]').val("");
    }
  }); //end of on-submit event

  $("body").on("click", ".delete-button", (e) => {
    //filter click events to only of the class, .delete-button
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

//##################################################################################################################
//Functions
//##################################################################################################################

const addEmployeeToDatabase = (
  pnumEmployeeID,
  pstrFirstName,
  pstrLastName,
  pstrTitle,
  pnumSalary,
  parrEmployeeIDs,
  pobjEmployees
) => {
  //function to add an employee to object of employees with a unique ID
  //this implementation was utilized because order is unneccessary
  //fast access/insertion/removal is needed

  pobjEmployees[globalEmployeePrimaryKeyID] = {
    numEmployeeID: pnumEmployeeID,
    strFirstName: pstrFirstName,
    strLastName: pstrLastName,
    strTitle: pstrTitle,
    numSalary: pnumSalary,
    blnActive: true,
  };
  //add employee ID to an array for future validation purposes
  parrEmployeeIDs.push(pnumEmployeeID);
  globalTotalCosts += pnumSalary;

  return true;
};

const inactivateEmployee = (pnumEmployeePrimaryKey, pobjEmployees) => {
  //employees should remain in our database for future purposes
  //render them inactive instead
  pobjEmployees[pnumEmployeePrimaryKey].blnActive = false;
  globalTotalCosts -= pobjEmployees[pnumEmployeePrimaryKey].numSalary;

  return true;
};

const getMonthlyCosts = () => {
  //use global globalTotalCosts to get the montly costs
  return Math.round((globalTotalCosts / 12) * 100) / 100;
};

const isOverBudget = () => {
  // check if company is over budget. total = 20,000/month * 12 months = 240,000 total
  return globalTotalCosts > 240000;
};

const doesEmployeeIDExist = (pnumEmployeeID, parrEmployeeIDs) => {
  return parrEmployeeIDs.some((id) => id === pnumEmployeeID);
};
