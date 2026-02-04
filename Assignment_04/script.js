window.onload = function () {
  var submitBtn = document.getElementById('submitBtn')

  submitBtn.disabled = true
  submitBtn.style.backgroundColor = 'gray'
  submitBtn.style.cursor = 'not-allowed'
  submitBtn.style.opacity = '0.6'

  document.getElementById('firstName').addEventListener('input', validateAll)
  document.getElementById('lastName').addEventListener('input', validateAll)
  document.getElementById('emailId').addEventListener('input', validateAll)
var phoneInput = document.getElementById("phoneNumber");

phoneInput.addEventListener("input", function () {
  phoneInput.value = formatPhone(phoneInput.value);
  validateAll();
});

  document.getElementById('zipcode').addEventListener('input', validateAll)
  document.getElementById('comments').addEventListener('input', validateAll)

  var sources = document.querySelectorAll("input[name='source']")
  for (var i = 0; i < sources.length; i++) {
    sources[i].addEventListener('change', validateAll)
  }

  var titleRadios = document.querySelectorAll("input[name='title']")
  for (var i = 0; i < titleRadios.length; i++) {
    titleRadios[i].addEventListener('change', validateAll)
  }

  var topicSelect = document.getElementById("topicSelect");

topicSelect.addEventListener("change", function () {
  renderDynamicCheckbox(topicSelect.value);
  validateAll();
});




  validateAll()
}

function onlyDigits(str) {
  return str.replace(/\D/g, "");
}

function formatPhone(digits) {
  digits = onlyDigits(digits).slice(0, 10);

  var p1 = digits.slice(0, 3);
  var p2 = digits.slice(3, 6);
  var p3 = digits.slice(6, 10);

  if (digits.length <= 3) return p1;
  if (digits.length <= 6) return p1 + "-" + p2;
  return p1 + "-" + p2 + "-" + p3;
}

function setError(inputEl, errEl, msg) {
  errEl.innerText = msg
  if (inputEl) {
    inputEl.classList.add('invalid')
    inputEl.classList.remove('valid')
  }
}

function clearError(inputEl, errEl) {
  errEl.innerText = ''
  if (inputEl) {
    inputEl.classList.remove('invalid')
    inputEl.classList.add('valid')
  }
}

function isAlphaOnly(val) {
  return /^[A-Za-z ]+$/.test(val.trim())
}

function validateTitle() {
  var err = document.getElementById('err_title')
  var checked = document.querySelector("input[name='title']:checked")

  if (!checked) {
    err.innerText = 'Please select a title.'
    return false
  }

  err.innerText = ''
  return true
}

function validateFirstName() {
  var input = document.getElementById('firstName')
  var err = document.getElementById('err_firstName')
  var val = input.value.trim()

  if (val.length === 0) {
    setError(input, err, 'First name is required.')
    return false
  }
  if (val.length < 2) {
    setError(input, err, 'First name must be at least 2 characters.')
    return false
  }
  if (val.length > 20) {
    setError(input, err, 'First name must be at most 20 characters.')
    return false
  }
  if (!isAlphaOnly(val)) {
    setError(input, err, 'First name must contain letters only.')
    return false
  }

  clearError(input, err)
  return true
}

function validateLastName() {
  var input = document.getElementById('lastName')
  var err = document.getElementById('err_lastName')
  var val = input.value.trim()

  if (val.length === 0) {
    setError(input, err, 'Last name is required.')
    return false
  }
  if (val.length < 2) {
    setError(input, err, 'Last name must be at least 2 characters.')
    return false
  }
  if (val.length > 20) {
    setError(input, err, 'Last name must be at most 20 characters.')
    return false
  }
  if (!isAlphaOnly(val)) {
    setError(input, err, 'Last name must contain letters only.')
    return false
  }

  clearError(input, err)
  return true
}

function setSubmitEnabled(enabled) {
  var submitBtn = document.getElementById('submitBtn')
  submitBtn.disabled = !enabled
  submitBtn.style.backgroundColor = enabled ? 'orange' : 'gray'
  submitBtn.style.cursor = enabled ? 'pointer' : 'not-allowed'
  submitBtn.style.opacity = enabled ? '1' : '0.6'
}

function validateAll() {
  var ok = true

  ok = validateTitle() && ok
  ok = validateFirstName() && ok
  ok = validateLastName() && ok
  function isValidNEUEmail(email) {
    return /^[A-Za-z0-9._%+-]+@northeastern\.edu$/.test(email.trim())
  }

  function isValidZip(zip) {
    return /^\d{5}$/.test(zip.trim())
  }

  function isValidPhone(phone) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone.trim())
  }

  function validateEmail() {
    var input = document.getElementById('emailId')
    var err = document.getElementById('err_emailId')
    var val = input.value.trim()

    if (val.length === 0) {
      setError(input, err, 'Email is required.')
      return false
    }
    if (!isValidNEUEmail(val)) {
      setError(input, err, 'Email must be a valid @northeastern.edu address.')
      return false
    }

    clearError(input, err)
    return true
  }

  function validateZip() {
    var input = document.getElementById('zipcode')
    var err = document.getElementById('err_zipcode')
    var val = input.value.trim()

    if (val.length === 0) {
      setError(input, err, 'Zipcode is required.')
      return false
    }
    if (!isValidZip(val)) {
      setError(input, err, 'Zipcode must be exactly 5 digits.')
      return false
    }

    clearError(input, err)
    return true
  }

  function validatePhone() {
    var input = document.getElementById('phoneNumber')
    var err = document.getElementById('err_phoneNumber')
    var val = input.value.trim()

    if (val.length === 0) {
      setError(input, err, 'Phone number is required.')
      return false
    }
    if (!isValidPhone(val)) {
      setError(input, err, 'Phone must be in format xxx-xxx-xxxx.')
      return false
    }

    clearError(input, err)
    return true
  }
  function validateSource() {
    var err = document.getElementById('err_source')
    var boxes = document.querySelectorAll("input[name='source']")
    var checked = 0

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) checked++
    }

    if (checked === 0) {
      err.innerText = 'Please select at least one source.'
      return false
    }

    err.innerText = ''
    return true
  }

  function validateComments() {
    var input = document.getElementById('comments')
    var err = document.getElementById('err_comments')
    var val = input.value.trim()

    if (val.length === 0) {
      setError(input, err, 'Comments are required.')
      return false
    }
    if (val.length < 5) {
      setError(input, err, 'Comments must be at least 5 characters.')
      return false
    }
    if (val.length > 200) {
      setError(input, err, 'Comments must be at most 200 characters.')
      return false
    }

    clearError(input, err)
    return true
  }
  function renderDynamicCheckbox(selectedValue) {
  var area = document.getElementById("dynamicArea");
  area.innerHTML = "";

  if (!selectedValue) return;

  var cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = "dynCb";

  var label = document.createElement("label");
  label.htmlFor = "dynCb";
  label.innerText = " Enable " + selectedValue;

  area.appendChild(cb);
  area.appendChild(label);

cb.addEventListener("change", function () {
  renderDynamicTextField(cb.checked, selectedValue);
  validateAll();
});

}
function renderDynamicTextField(isEnabled, topicValue) {
  var area = document.getElementById("dynamicArea");

  var old = document.getElementById("dynTextWrap");
  if (old) old.remove();

  if (!isEnabled) return;

  var wrap = document.createElement("div");
  wrap.id = "dynTextWrap";

  var br = document.createElement("br");

  var input = document.createElement("input");
  input.type = "text";
  input.id = "dynText";
  input.placeholder = "Enter details for " + topicValue;

  var err = document.createElement("small");
  err.className = "error";
  err.id = "err_dynText";

  input.addEventListener("input", validateAll);

  wrap.appendChild(br);
  wrap.appendChild(input);
  wrap.appendChild(err);

  area.appendChild(wrap);
}

function validateTopicSelect() {
  var input = document.getElementById("topicSelect");
  var err = document.getElementById("err_topicSelect");

  if (!input.value || input.value.trim() === "") {
    err.innerText = "Please select a topic.";
    return false;
  }

  err.innerText = "";
  return true;
}
function validateDynamicText() {
  var cb = document.getElementById("dynCb");
  var input = document.getElementById("dynText");
  var err = document.getElementById("err_dynText");


  if (!cb || !cb.checked) return true;


  if (!input || !err) return false;

  var val = input.value.trim();
  if (val.length === 0) {
    setError(input, err, "This field is required.");
    return false;
  }
  if (val.length < 3) {
    setError(input, err, "Please enter at least 3 characters.");
    return false;
  }
  if (val.length > 50) {
    setError(input, err, "Please enter at most 50 characters.");
    return false;
  }

  clearError(input, err);
  return true;
}
  ok = validateDynamicText() && ok
  ok = validateTopicSelect() && ok

  ok = validateEmail() && ok
  ok = validateZip() && ok
  ok = validatePhone() && ok
  ok = validateSource() && ok
  ok = validateComments() && ok
  setSubmitEnabled(ok)
  return ok
}
