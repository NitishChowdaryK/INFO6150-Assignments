window.onload = function () {
  var submitBtn = document.getElementById('submitBtn')

  submitBtn.disabled = true
  submitBtn.style.backgroundColor = 'gray'
  submitBtn.style.cursor = 'not-allowed'
  submitBtn.style.opacity = '0.6'

  document.getElementById('firstName').addEventListener('input', validateAll)
  document.getElementById('lastName').addEventListener('input', validateAll)
  document.getElementById('emailId').addEventListener('input', validateAll)

  var phoneInput = document.getElementById('phoneNumber')
  phoneInput.addEventListener('input', function () {
    phoneInput.value = formatPhone(phoneInput.value)
    validateAll()
  })

  document.getElementById('zipcode').addEventListener('input', validateAll)

  document.getElementById('comments').addEventListener('input', validateAll)
  document.getElementById('comments').addEventListener('input', function () {
    updateCommentCounter()
  })

  var address2 = document.getElementById('address2')
if (address2) {
  address2.addEventListener('input', function () {
    updateAddress2Counter()
    validateAll()
  })
}
updateAddress2Counter()


  var sources = document.querySelectorAll("input[name='source']")
  for (var i = 0; i < sources.length; i++) {
    sources[i].addEventListener('change', validateAll)
  }

  var titleRadios = document.querySelectorAll("input[name='title']")
  for (var j = 0; j < titleRadios.length; j++) {
    titleRadios[j].addEventListener('change', validateAll)
  }

  var topicSelect = document.getElementById('topicSelect')
  if (topicSelect) {
    topicSelect.addEventListener('change', function () {
      renderDynamicCheckbox(topicSelect.value);
      validateAll()
    })
  }

  validateAll()
  updateCommentCounter()
}

function updateCommentCounter() {
  var textarea = document.getElementById('comments')
  var counter = document.getElementById('commentCounter')

  if (!textarea || !counter) return

  var len = textarea.value.length
  counter.innerText = len + ' / 200'
  counter.style.color = len > 180 ? 'red' : 'black'
}

function onlyDigits(str) {
  return str.replace(/\D/g, '')
}

function formatPhone(digits) {
  digits = onlyDigits(digits).slice(0, 10)

  var p1 = digits.slice(0, 3)
  var p2 = digits.slice(3, 6)
  var p3 = digits.slice(6, 10)

  if (digits.length <= 3) return "(" + p1
  if (digits.length <= 6) return "(" + p1 + ") " + p2
  return "(" + p1 + ") " + p2 + "-" + p3
}


function setError(inputEl, errEl, msg) {
  if (errEl) errEl.innerText = msg
  if (inputEl) {
    inputEl.classList.add('invalid')
    inputEl.classList.remove('valid')
  }
}

function clearError(inputEl, errEl) {
  if (errEl) errEl.innerText = ''
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
    if (err) err.innerText = 'Please select a title.'
    return false
  }

  if (err) err.innerText = ''
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
  if (!submitBtn) return

  submitBtn.disabled = !enabled
  submitBtn.style.backgroundColor = enabled ? 'orange' : 'gray'
  submitBtn.style.cursor = enabled ? 'pointer' : 'not-allowed'
  submitBtn.style.opacity = enabled ? '1' : '0.6'
}

function isValidNEUEmail(email) {
  return /^[A-Za-z0-9._%+-]+@northeastern\.edu$/.test(email.trim())
}

function isValidZip(zip) {
  return /^\d{5}$/.test(zip.trim())
}

function isValidPhone(phone) {
  return /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phone.trim())
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
    if (err) err.innerText = 'Please select at least one source.'
    return false
  }

  if (err) err.innerText = ''
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

function validateTopicSelect() {
  var input = document.getElementById('topicSelect')
  var err = document.getElementById('err_topicSelect')

  if (!input) return true 

  if (!input.value || input.value.trim() === '') {
    if (err) err.innerText = 'Please select a topic.'
    return false
  }

  if (err) err.innerText = ''
  return true
}

function renderDynamicCheckbox(selectedValue) {
  var area = document.getElementById("dynamicArea");
  if (!area) return; 

  var oldCb = document.getElementById("dynCb");
  var wasChecked = oldCb ? oldCb.checked : false;

  area.innerHTML = "";

  if (!selectedValue) return;

  var cb = document.createElement("input");
  cb.type = "checkbox";
  cb.id = "dynCb";
  cb.checked = wasChecked;

  var label = document.createElement("label");
  label.htmlFor = "dynCb";
  label.innerText = " Enable " + selectedValue;

  area.appendChild(cb);
  area.appendChild(label);

  renderDynamicTextField(cb.checked, selectedValue); 

  cb.addEventListener("change", function () {
    renderDynamicTextField(cb.checked, selectedValue);
    validateAll();
  });





  if (cb.checked) {
    renderDynamicTextField(true, selectedValue)
  }
}

function renderDynamicTextField(isEnabled, topicValue) {
  var area = document.getElementById('dynamicArea')
  if (!area) return

  var old = document.getElementById('dynTextWrap')
  if (old) old.remove()

  if (!isEnabled) return

  var wrap = document.createElement('div')
  wrap.id = 'dynTextWrap'

  var br = document.createElement('br')

  var input = document.createElement('input')
  input.type = 'text'
  input.id = 'dynText'
  input.placeholder = 'Enter details for ' + topicValue

  var err = document.createElement('small')
  err.className = 'error'
  err.id = 'err_dynText'

  input.addEventListener('input', validateAll)

  wrap.appendChild(br)
  wrap.appendChild(input)
  wrap.appendChild(err)

  area.appendChild(wrap)
}

function validateDynamicText() {
  var cb = document.getElementById('dynCb')
  var input = document.getElementById('dynText')
  var err = document.getElementById('err_dynText')

  if (!cb || !cb.checked) return true

  if (!input || !err) return false

  var val = input.value.trim()
  if (val.length === 0) {
    setError(input, err, 'This field is required.')
    return false
  }
  if (val.length < 3) {
    setError(input, err, 'Please enter at least 3 characters.')
    return false
  }
  if (val.length > 50) {
    setError(input, err, 'Please enter at most 50 characters.')
    return false
  }

  clearError(input, err)
  return true
}

function updateAddress2Counter() {
  var input = document.getElementById('address2')
  var counter = document.getElementById('address2Counter')
  if (!input || !counter) return

  var len = input.value.length
  counter.innerText = len + ' / 20'
  counter.style.color = len > 18 ? 'red' : 'black'
}

function validateAddress2() {
  var input = document.getElementById('address2')
  var err = document.getElementById('err_address2')
  if (!input) return true

  var val = input.value.trim()
  if (val.length === 0) {
    if (err) err.innerText = ''
    input.classList.remove('invalid')
    input.classList.remove('valid')
    return true
  }
  if (val.length > 20) {
    setError(input, err, 'Address 2 must be at most 20 characters.')
    return false
  }
  if (!/^[A-Za-z0-9 ]+$/.test(val)) {
    setError(input, err, 'Address 2 must be alphanumeric only (no special characters).')
    return false
  }

  clearError(input, err)
  return true
}



function validateAll() {
  var ok = true

  ok = validateTitle() && ok
  ok = validateFirstName() && ok
  ok = validateLastName() && ok

  var topicEl = document.getElementById('topicSelect')
  
  ok = validateTopicSelect() && ok
  ok = validateDynamicText() && ok

  ok = validateEmail() && ok
  ok = validateZip() && ok
  ok = validatePhone() && ok
  ok = validateSource() && ok
  ok = validateComments() && ok
  ok = validateAddress2() && ok


  setSubmitEnabled(ok)
  return ok
}

var submissions = [];

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateAll()) return;

    var title = (document.querySelector("input[name='title']:checked") || {}).value || "";
    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var emailId = document.getElementById("emailId").value.trim();
    var phoneNumber = document.getElementById("phoneNumber").value.trim();
    var zipcode = document.getElementById("zipcode").value.trim();
    var address2 = (document.getElementById("address2") || {}).value ? document.getElementById("address2").value.trim() : "";

    var topic = (document.getElementById("topicSelect") || {}).value || "";

    var dynEnabled = document.getElementById("dynCb") ? document.getElementById("dynCb").checked : false;
    var dynText = document.getElementById("dynText") ? document.getElementById("dynText").value.trim() : "";

    var sources = [];
    var boxes = document.querySelectorAll("input[name='source']:checked");
    for (var i = 0; i < boxes.length; i++) sources.push(boxes[i].value);

    var comments = document.getElementById("comments").value.trim();

    submissions.push({
      title,
      firstName,
      lastName,
      emailId,
      phoneNumber,
      zipcode,
      address2,
      topic,
      dynEnabled: dynEnabled ? "Yes" : "No",
      dynText: dynEnabled ? dynText : "",
      sources: sources.join(", "),
      comments
    });

    renderResultsTable();

    form.reset();

    var dynArea = document.getElementById("dynamicArea");
    if (dynArea) dynArea.innerHTML = "";
    var errs = document.querySelectorAll(".error");
    for (var k = 0; k < errs.length; k++) errs[k].innerText = "";

    var inputs = document.querySelectorAll("input, textarea, select");
    for (var m = 0; m < inputs.length; m++) {
      inputs[m].classList.remove("invalid");
      inputs[m].classList.remove("valid");
    }

    updateCommentCounter();
    updateAddress2Counter();
    setSubmitEnabled(false);
  });
});

function renderResultsTable() {
  var area = document.getElementById("resultsArea");
  if (!area) return;

  var html = "<h3>Submitted Results</h3>";
  html += "<table border='1' cellpadding='6' cellspacing='0' style='border-collapse:collapse; width:100%;'>";
  html += "<tr>" +
          "<th>Title</th><th>First</th><th>Last</th><th>Email</th><th>Phone</th><th>Zip</th>" +
          "<th>Address2</th><th>Topic</th><th>Enabled</th><th>Details</th><th>Source</th><th>Comments</th>" +
          "</tr>";

  for (var i = 0; i < submissions.length; i++) {
    var s = submissions[i];
    html += "<tr>" +
            "<td>" + s.title + "</td>" +
            "<td>" + s.firstName + "</td>" +
            "<td>" + s.lastName + "</td>" +
            "<td>" + s.emailId + "</td>" +
            "<td>" + s.phoneNumber + "</td>" +
            "<td>" + s.zipcode + "</td>" +
            "<td>" + (s.address2 || "") + "</td>" +
            "<td>" + s.topic + "</td>" +
            "<td>" + s.dynEnabled + "</td>" +
            "<td>" + (s.dynText || "") + "</td>" +
            "<td>" + s.sources + "</td>" +
            "<td>" + s.comments + "</td>" +
            "</tr>";
  }

  html += "</table>";
  area.innerHTML = html;
}


