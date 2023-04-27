const form = document.querySelector(".contact_form");
const formid = document.getElementById("formId");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const text = document.querySelector("#message")
const message = document.querySelector("#text-message");
const button = document.querySelector("button");

function validateForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    if (checkLength(fullName.value, 5) === false) {
        message.innerHTML += `<div class="no_requirement">Name must have a minimun length of 5 letters</div>`;
    }

    if (validateEmail(email.value) === false) {
        message.innerHTML += `<div class="no_requirement">Email should be a valid email</div>`;
    }

    if (checkLength(subject.value, 15) === false) {
        message.innerHTML += `<div class="no_requirement">Subject must have a minimum length of 15 letters</div>`;
    }

    if (checkLength(text.value, 25) === false) {
        message.innerHTML += `<div class="no_requirement">Message must have a minimum length of 25 letters</div>`
    }
}

function submitForm(event) {
    event.preventDefault(); 
    if (checkLength(fullName.value, 5)
        && validateEmail(email.value)
        && checkLength(subject.value, 15)
        && checkLength(text.value, 25)) {
        message.innerHTML += '<div class="success">Success! Your info was submitted</div>';
    }
}

form.addEventListener("submit", validateForm);

form.addEventListener("submit", submitForm);

function checkLength(value, len) {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}































// const form = document.querySelector("form");
// const name = document.querySelector("#name");
// const email = document.querySelector("#email");
// const subject = document.querySelector("#subject");
// const text = document.querySelector("#message");
// const button = document.querySelector("button");

// function validateForm(event) {
//     event.preventDefault();

//     if (checkLength(name.value, 5) === false) {
//         message.innerHTML += `<div class="no-requirement">Name must have a minimun length of 5 letters</div>`;
//     } else {
//         message.innerHTML.display = `<div class="success"></div>`;
//     }

//     if (validateEmail(email.value) === false) {
//         message.innerHTML += `<div class="no-requirement">Email should be an email</div>`;
//     } else {
//         message.innerHTML.display = `<div class="success"></div>`;
//     }

//     if (checkLength(subject.value, 15) === false) {
//         message.innerHTML += `<div class="no-requirement">Subject must have a minimum length of 15 letters</div>`;
//     } else {
//         message.innerHTML.display = `<div class="success"></div>`;
//     }

//     if (checkLength(text.value, 25) === false) {
//         message.innerHTML += `<div class="no-requirement">Message must have a minimum length of 25 letters</div>`;
//     } else {
//         message.innerHTML.display = `<div class="success"></div>`;
//     }

// }

// function submitForm(event) {
//     event.preventDefault(); 
//     if (checkLength(name.value, 5)
//         && validateEmail(email.value)
//         && checkLength(subject.value, 15)
//         && checkLength(text.value, 25)) {
//         message.innerHTML += '<div class="success">Success! Your info was submitted</div>';
//     } else {
//         form.input.reset();
//         form.message.reset();
//     }
    
// }

// form.addEventListener("submit", validateForm);

// form.addEventListener("submit", submitForm);

// function checkLength(value, len) {
//     if (value.trim().length >= len) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function validateEmail(email) {
//     const regEx = /\S+@\S+\.\S+/;
//     const patternMatches = regEx.test(email);
//     return patternMatches;
// }