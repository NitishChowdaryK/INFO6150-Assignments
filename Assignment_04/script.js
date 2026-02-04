window.onload = function () {
  var submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "gray";
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.opacity = "0.6";


document.getElementById("firstName").addEventListener("input", validateAll);
document.getElementById("lastName").addEventListener("input", validateAll);

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

  setSubmitEnabled(ok);
  return ok;
}
