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

function getStudentRowCount() {
  var rows = document.querySelectorAll('#myTable tr')
  var count = 0

  for (var i = 0; i < rows.length; i++) {
    if (i === 0) continue
    if (rows[i].classList.contains('dropDownTextArea')) continue
    count++
  }
  return count
}
function reorderStudents() {
  var rows = document.querySelectorAll('#myTable tr')
  var count = 1

  for (var i = 0; i < rows.length; i++) {
    if (i === 0) continue
    if (rows[i].classList.contains('dropDownTextArea')) continue

    rows[i].children[1].innerText = 'Student ' + count
    rows[i].children[2].innerText = 'Teacher ' + count

    if (rows[i].children[6]) {
      rows[i].children[6].innerText = String(10000 + count)
    }

    count++
  }
}

document.getElementById('add').onclick = function () {
  try {
    var table = document.getElementById('myTable')

    var nextNum = getNextStudentNumber()
    var insertIndex = findInsertIndexForStudentNumber(nextNum)

    var newRow = table.insertRow(insertIndex)

    var cell0 = newRow.insertCell(0)
    var cell1 = newRow.insertCell(1)
    var cell2 = newRow.insertCell(2)
    var cell3 = newRow.insertCell(3)
    var cell4 = newRow.insertCell(4)
    var cell5 = newRow.insertCell(5)
    var cell6 = newRow.insertCell(6)
    var cell7 = newRow.insertCell(7)
    var cell8 = newRow.insertCell(8)

    cell0.innerHTML =
      '<input type="checkbox" /><br /><br /><img src="down.png" width="25px" />'
    cell1.innerText = 'Student ' + nextNum
    cell2.innerText = 'Teacher ' + nextNum
    cell3.innerText = 'Approved'
    cell4.innerText = 'Fall'
    cell5.innerText = 'TA'
    cell6.innerText = String(10000 + nextNum)
    cell7.innerText = '100%'
    cell8.innerHTML = ''

    var detailRow = table.insertRow(newRow.rowIndex + 1)
    detailRow.className = 'dropDownTextArea'
    detailRow.style.display = 'none'

    var detailCell = detailRow.insertCell(0)
    detailCell.colSpan = 9
    detailCell.innerHTML =
      '<strong>Student ' +
      nextNum +
      ' Details:</strong><br /><br />' +
      'Award Details: Honors Student<br />' +
      'Fall 1-2024(TA)<br />' +
      'Comments: Outstanding<br />' +
      'Award Status: A'

    alert('Student ' + nextNum + ' Record added successfully')
  } catch (e) {
    alert('Error: ' + e.message)
  }
}

function getNextStudentNumber() {
  var rows = document.querySelectorAll('#myTable tr')
  var used = {}
  var i, row, studentCell, text, num

  for (i = 1; i < rows.length; i++) {
    row = rows[i]
    if (row.classList.contains('dropDownTextArea')) continue

    studentCell = row.children[1]
    if (!studentCell) continue

    text = studentCell.innerText
    num = parseInt(text.replace('Student', '').trim(), 10)

    if (!isNaN(num)) used[num] = true
  }

  var candidate = 1
  while (used[candidate]) candidate++
  return candidate
}
function getStudentNumberFromRow(row) {
  var text = row.children[1].innerText
  return parseInt(text.replace('Student', '').trim(), 10)
}

function findInsertIndexForStudentNumber(num) {
  var table = document.getElementById('myTable')
  var rows = table.querySelectorAll('tr')

  for (var i = 1; i < rows.length; i++) {
    if (rows[i].classList.contains('dropDownTextArea')) continue

    var existingNum = getStudentNumberFromRow(rows[i])
    if (!isNaN(existingNum) && existingNum > num) {
      return i
    }
  }

  return -1
}
