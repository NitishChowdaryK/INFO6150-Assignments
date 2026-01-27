//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1
}

Title.prototype.getName = function () {
  return this.mytitle
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com',
}

var t = new Title('CONNECT WITH ME!')

window.onload = function () {
  const header = document.createElement('h2')
  header.innerText = 'Full Name: Nitish Chowdary Kolupoti | NUID: 002306783'
  document.body.insertBefore(header, document.body.firstChild)

  const dropDowns = document.querySelectorAll('.dropDownTextArea')
  dropDowns.forEach((row) => {
    row.style.display = 'none'
  })

  const submitBtn = document.getElementById('button')
  submitBtn.disabled = true
  submitBtn.style.backgroundColor = 'gray'
  submitBtn.style.cursor = 'not-allowed'
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && event.target.src.includes('down.png')) {
    const currentRow = event.target.closest('tr')
    const detailRow = currentRow.nextElementSibling

    if (detailRow && detailRow.classList.contains('dropDownTextArea')) {
      if (detailRow.style.display === 'none') {
        detailRow.style.display = 'table-row'
      } else {
        detailRow.style.display = 'none'
      }
    }
  }
})
