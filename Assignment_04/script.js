window.onload = function () {
  var submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "gray";
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.opacity = "0.6";


document.getElementById("firstName").addEventListener("input", validateAll);
document.getElementById("lastName").addEventListener("input", validateAll);
document.getElementById("emailId").addEventListener("input", validateAll);
document.getElementById("phoneNumber").addEventListener("input", validateAll);
document.getElementById("zipcode").addEventListener("input", validateAll);


var titleRadios = document.querySelectorAll("input[name='title']");
for (var i = 0; i < titleRadios.length; i++) {
  titleRadios[i].addEventListener("change", validateAll);
}

validateAll();

};


function setError(inputEl, errEl, msg) {
  errEl.innerText = msg;
  if (inputEl) {
    inputEl.classList.add("invalid");
    inputEl.classList.remove("valid");
  }
}

function clearError(inputEl, errEl) {
  errEl.innerText = "";
  if (inputEl) {
    inputEl.classList.remove("invalid");
    inputEl.classList.add("valid");
  }
}

function isAlphaOnly(val) {
  // letters and spaces only (no digits, no special chars)
  return /^[A-Za-z ]+$/.test(val.trim());
}

function validateTitle() {
  var err = document.getElementById("err_title");
  var checked = document.querySelector("input[name='title']:checked");

  if (!checked) {
    err.innerText = "Please select a title.";
    return false;
  }

  err.innerText = "";
  return true;
}

function validateFirstName() {
  var input = document.getElementById("firstName");
  var err = document.getElementById("err_firstName");
  var val = input.value.trim();

  if (val.length === 0) {
    setError(input, err, "First name is required.");
    return false;
  }
  if (val.length < 2) {
    setError(input, err, "First name must be at least 2 characters.");
    return false;
  }
  if (val.length > 20) {
    setError(input, err, "First name must be at most 20 characters.");
    return false;
  }
  if (!isAlphaOnly(val)) {
    setError(input, err, "First name must contain letters only.");
    return false;
  }

  clearError(input, err);
  return true;
}

function validateLastName() {
  var input = document.getElementById("lastName");
  var err = document.getElementById("err_lastName");
  var val = input.value.trim();

  if (val.length === 0) {
    setError(input, err, "Last name is required.");
    return false;
  }
  if (val.length < 2) {
    setError(input, err, "Last name must be at least 2 characters.");
    return false;
  }
  if (val.length > 20) {
    setError(input, err, "Last name must be at most 20 characters.");
    return false;
  }
  if (!isAlphaOnly(val)) {
    setError(input, err, "Last name must contain letters only.");
    return false;
  }

  clearError(input, err);
  return true;
}

function setSubmitEnabled(enabled) {
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = !enabled;
  submitBtn.style.backgroundColor = enabled ? "orange" : "gray";
  submitBtn.style.cursor = enabled ? "pointer" : "not-allowed";
  submitBtn.style.opacity = enabled ? "1" : "0.6";
}

function validateAll() {
  var ok = true;

  ok = validateTitle() && ok;
  ok = validateFirstName() && ok;
  ok = validateLastName() && ok;
function isValidNEUEmail(email) {
  return /^[A-Za-z0-9._%+-]+@northeastern\.edu$/.test(email.trim());
}

function isValidZip(zip) {
  return /^\d{5}$/.test(zip.trim());
}

function isValidPhone(phone) {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone.trim());
}

function validateEmail() {
  var input = document.getElementById("emailId");
  var err = document.getElementById("err_emailId");
  var val = input.value.trim();

  if (val.length === 0) {
    setError(input, err, "Email is required.");
    return false;
  }
  if (!isValidNEUEmail(val)) {
    setError(input, err, "Email must be a valid @northeastern.edu address.");
    return false;
  }

  clearError(input, err);
  return true;
}

function validateZip() {
  var input = document.getElementById("zipcode");
  var err = document.getElementById("err_zipcode");
  var val = input.value.trim();

  if (val.length === 0) {
    setError(input, err, "Zipcode is required.");
    return false;
  }
  if (!isValidZip(val)) {
    setError(input, err, "Zipcode must be exactly 5 digits.");
    return false;
  }

  clearError(input, err);
  return true;
}

function validatePhone() {
  var input = document.getElementById("phoneNumber");
  var err = document.getElementById("err_phoneNumber");
  var val = input.value.trim();

  if (val.length === 0) {
    setError(input, err, "Phone number is required.");
    return false;
  }
  if (!isValidPhone(val)) {
    setError(input, err, "Phone must be in format xxx-xxx-xxxx.");
    return false;
  }

  clearError(input, err);
  return true;
}

  ok = validateEmail() && ok;
  ok = validateZip() && ok;
  ok = validatePhone() && ok;
  setSubmitEnabled(ok);
  return ok;
}
