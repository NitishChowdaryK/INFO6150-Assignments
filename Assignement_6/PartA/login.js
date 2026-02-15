$(document).ready(function () {

  const users = [
    { email: "kolupoti.n@northeastern.edu", password: "Password123" },
    { email: "test@northeastern.edu", password: "Test12345" }
  ];

  const validateEmail = () => {
    const email = $("#email").val().trim();
    const regex = /^[^\s@]+@northeastern\.edu$/;

    if (!email || !regex.test(email)) {
      $("#emailError").text("Please enter a valid Northeastern email");
      return false;
    }
    $("#emailError").text("");
    return true;
  };

  const validatePassword = () => {
    const password = $("#password").val();

    if (!password) {
      $("#passwordError").text("Password cannot be empty");
      return false;
    }
    if (password.length < 8) {
      $("#passwordError").text("Password must be at least 8 characters");
      return false;
    }
    $("#passwordError").text("");
    return true;
  };

  const toggleButton = () => {
    if (validateEmail() && validatePassword()) {
      $("#loginBtn").prop("disabled", false);
    } else {
      $("#loginBtn").prop("disabled", true);
    }
  };

  $("#email, #password").on("keyup blur", toggleButton);

  $("#email").on("focus", () => {
    $("#emailError").text("");
    $("#loginError").text("");
  });
  $("#password").on("focus", () => {
    $("#passwordError").text("");
    $("#loginError").text("");
  });

  $("#loginBtn").click(function () {
    const email = $("#email").val().trim();
    const password = $("#password").val();

    const okEmail = validateEmail();
    const okPass = validatePassword();
    if (!okEmail || !okPass) return;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      $("#loginError").text("Invalid email or password");
      return;
    }

    const username = email.split("@")[0];
    const sessionData = {
      username,
      email,
      loginTime: new Date().toISOString(),
      isLoggedIn: true
    };

    if ($("#remember").is(":checked")) {
      localStorage.setItem("session", JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem("session", JSON.stringify(sessionData));
    }

    $("#successMsg")
      .text("Login successful! Redirecting...")
      .hide()
      .fadeIn(200);

    setTimeout(() => {
      window.location.href = "calculator.html";
    }, 2000);
  });
});
