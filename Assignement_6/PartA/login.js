$(document).ready(function () {
  const validateEmail = () => {
    const email = $('#email').val().trim()
    const regex = /^[^\s@]+@northeastern\.edu$/

    if (!email || !regex.test(email)) {
      $('#emailError').text('Please enter a valid Northeastern email')
      return false
    }
    $('#emailError').text('')
    return true
  }

  const validatePassword = () => {
    const password = $('#password').val()

    if (!password) {
      $('#passwordError').text('Password cannot be empty')
      return false
    }
    if (password.length < 8) {
      $('#passwordError').text('Password must be at least 8 characters')
      return false
    }
    $('#passwordError').text('')
    return true
  }

  const toggleButton = () => {
    if (validateEmail() && validatePassword()) {
      $('#loginBtn').prop('disabled', false)
    } else {
      $('#loginBtn').prop('disabled', true)
    }
  }

  $('#email, #password').on('keyup blur', toggleButton)

  $('#email').on('focus', () => $('#emailError').text(''))
  $('#password').on('focus', () => $('#passwordError').text(''))
})
