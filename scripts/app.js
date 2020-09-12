//need to create ids for delete button
$(document).ready(() => {
  $("#employee-form").on("submit", (e) => {
    e.preventDefault();

    //if nothing is passed, alert the user
    if (
      //if any inputs are blank
      $("#employee-ID").val() === "" ||
      $("#employee-first-name").val() === "" ||
      $("#employee-last-name").val() === "" ||
      $("#employee-title").val() === "" ||
      $("##employee-salary").val() === ""
    ) {
      alert("Error: please provide input for all fields!");
    } else {
      //append employee data to table
      $("#employee-table-body").append(`<tr>
        <td>${$("#employee-ID").val()}</td>
        <td>${$("#employee-first-name").val()}</td>
        <td>${$("#employee-last-name").val()}</td>
        <td>${$("#employee-title").val()}</td>
        <td>${$("#employee-salary").val()}</td>
        <td>${"<button class='btn btn-danger'>Delete</button>"}</td>
    </tr>`);
    }
    $('input[type="text"]').val(""); //clear inputs when formsubmitted
  });
});
