const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

const fields = [username, email, password, password2]

const showError = (field, message) => {
    const formControl = field.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

const showSuccess = (field) => {
    const formControl = field.parentElement
    formControl.className = 'form-control success'
}

const checkEmailValidity = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const valid = re.test(String(email.value.trim()).toLowerCase())
    if (valid) {
        showSuccess(email)
    } else {
        showError(email, 'Email is not valid')
    }
}

const getFieldName = (field) => {
    const fieldName = field.id.charAt(0).toUpperCase() + field.id.slice(1)
    return fieldName
}

const checkRequired = (fields) => {
    fields.forEach((field) => {
        if (field.value.trim() === '') {
            showError(field, `${getFieldName(field)} is required`)
        } else {
            showSuccess(field)
        }
    })
}

const checkLength = (field, min, max) => {
    if (field.value.length < min) {
        showError(field, `${getFieldName(field)} must be at least ${min} characters`)
    } else if (field.value.length > max) {
        showError(field, `${getFieldName(field)} must be less than ${max} characters `)
    } else {
        showSuccess(field)
    }
}

const checkPasswordsMatch = (password, password2) => {
    if (password.value !== password2.value) {
        showError(password2, 'Passwords must match')
    }
}

//Event Listener
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired(fields)
    checkLength(username, 3, 10)
    checkLength(email, 6, 25)
    checkEmailValidity(email)
    checkPasswordsMatch(password, password2)
})

