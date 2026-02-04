window.onload = function () {
  var submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "gray";
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.opacity = "0.6";
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
