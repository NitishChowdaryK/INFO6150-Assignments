$(document).ready(function () {

  const session =
    JSON.parse(localStorage.getItem("session")) ||
    JSON.parse(sessionStorage.getItem("session"));

  if (!session || !session.isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  $("#welcome").text(`Welcome, ${session.username}!`);

  const calculate = (num1, num2, operation) => {
    switch (operation) {
      case "add":
        return num1 + num2;
      case "subtract":
        return num1 - num2;
      case "multiply":
        return num1 * num2;
      case "divide":
        return num2 === 0 ? "Cannot divide by zero" : num1 / num2;
      default:
        return "Invalid operation";
    }
  };

  const isValidNumber = (value) => /^[-+]?\d*\.?\d+$/.test(value.trim());

  const validateInputs = () => {
    const v1 = $("#num1").val();
    const v2 = $("#num2").val();

    let ok = true;

    if (!v1 || !isValidNumber(v1)) {
      $("#num1Error").text("Please enter a valid number");
      ok = false;
    } else {
      $("#num1Error").text("");
    }

    if (!v2 || !isValidNumber(v2)) {
      $("#num2Error").text("Please enter a valid number");
      ok = false;
    } else {
      $("#num2Error").text("");
    }

    return ok;
  };

  $("#num1").on("focus", () => $("#num1Error").text(""));
  $("#num2").on("focus", () => $("#num2Error").text(""));

  $(".op").click(function () {
    if (!validateInputs()) return;

    const num1 = parseFloat($("#num1").val());
    const num2 = parseFloat($("#num2").val());
    const operation = $(this).data("op");

    const result = calculate(num1, num2, operation);

    $("#result").val(result).hide().fadeIn(150);
  });

  $("#logout").click(function () {
    localStorage.removeItem("session");
    sessionStorage.removeItem("session");

    $("body").fadeOut(400, function () {
      window.location.href = "login.html";
    });
  });
});
