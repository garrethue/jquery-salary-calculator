$(document).ready(() => {
  $("#employee-form").on("submit", (e) => {
    e.preventDefault();
    //append employee data to table
    $("#employee-table-body").append(`<tr>
        <td>${$("#employee-ID").val()}</td>
        <td>${$("#employee-first-name").val()}</td>
        <td>${$("#employee-last-name").val()}</td>
        <td>${$("#employee-title").val()}</td>
        <td>${$("#employee-salary").val()}</td>
        <td>${"<button class='btn btn-danger'>Delete</button>"}</td>
    </tr>`);
  });
});
