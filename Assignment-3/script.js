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
  var header = document.createElement('h2')
  header.innerText = 'Full Name: Nitish Chowdary Kolupoti | NUID: 002306783'
  document.body.insertBefore(header, document.body.firstChild)

  var dropDowns = document.querySelectorAll('.dropDownTextArea')
  dropDowns.forEach((row) => {
    row.style.display = 'none'
  })

  var submitBtn = document.getElementById('button')
  submitBtn.disabled = true
  submitBtn.style.backgroundColor = 'gray'
  submitBtn.style.cursor = 'not-allowed'
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG' && event.target.src.includes('down.png')) {
    var currentRow = event.target.closest('tr')
    var detailRow = currentRow.nextElementSibling

    if (detailRow && detailRow.classList.contains('dropDownTextArea')) {
      if (detailRow.style.display === 'none') {
        detailRow.style.display = 'table-row'
      } else {
        detailRow.style.display = 'none'
      }
    }
  }
})

document.addEventListener('change', function (event) {
  if (event.target.type === 'checkbox') {
    var row = event.target.closest('tr')
    var submitBtn = document.getElementById('button')

    if (event.target.checked) {
      row.style.backgroundColor = 'yellow'
      addActionButtons(row)
    } else {
      row.style.backgroundColor = 'white'
      row.lastElementChild.innerHTML = ''
    }

    var checkedBoxes = document.querySelectorAll(
      "#myTable input[type='checkbox']:checked",
    )

    if (checkedBoxes.length > 0) {
      submitBtn.disabled = false
      submitBtn.style.backgroundColor = 'orange'
      submitBtn.style.cursor = 'pointer'
    } else {
      submitBtn.disabled = true
      submitBtn.style.backgroundColor = 'gray'
      submitBtn.style.cursor = 'not-allowed'
    }
  }
})



function addActionButtons(row) {
  var deleteCell = row.lastElementChild

  deleteCell.innerHTML = ''

  var deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'

  deleteBtn.onclick = function () {
    var studentName = row.children[1].innerText

    var detailRow = row.nextElementSibling
    if (detailRow && detailRow.classList.contains('dropDownTextArea')) {
      detailRow.remove()
    }

    row.remove()
    alert(studentName + ' Record deleted successfully')

    reorderStudents()
    updateSubmitState()
  }

  var editBtn = document.createElement('button')
  editBtn.innerText = 'Edit'

  editBtn.onclick = function () {
    var studentName = row.children[1].innerText
    var input = prompt('Edit details of ' + studentName)

    if (input !== null && input.trim() !== '') {
      alert(studentName + ' data updated successfully')
    }
  }

  deleteCell.appendChild(deleteBtn)
  deleteCell.appendChild(editBtn)
}

function updateSubmitState() {
  var submitBtn = document.getElementById('button')
  var checkedBoxes = document.querySelectorAll(
    "#myTable input[type='checkbox']:checked",
  )

  if (checkedBoxes.length > 0) {
    submitBtn.disabled = false
    submitBtn.style.backgroundColor = 'orange'
  } else {
    submitBtn.disabled = true
    submitBtn.style.backgroundColor = 'gray'
  }
}
