window.onload = function () {
  var submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "gray";
  submitBtn.style.cursor = "not-allowed";
  submitBtn.style.opacity = "0.6";
};
