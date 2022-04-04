/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Global variables & functions
  • Mobile navigation handler
  • Modal management
  • Form management
*/

/*
  • Global variables & functions
  ---------- ---------- ---------- ---------- ----------
*/

const INPUT_REGEX = {
    name: /^[ a-zA-Z-ç\-']{2,}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0](?:[a-zA-Z0]{0,61}[a-zA-Z0])?)*$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    number: /^\d+$/,
}

function checkInputValidity(item) {
    let testResult;
    const inputValue = item.value.trim();
    const regexId = item.parentElement.getAttribute("data-validator");
    const inputRegex = INPUT_REGEX[regexId];

    testResult = inputRegex.test(inputValue);

    item.parentElement.setAttribute("data-error-visible", `${testResult ? "false" : "true"}`);
}

function checkSelectValidity(item) {
    let isValid = false;
    const checkedOption = item.querySelector("input:checked");

    if (checkedOption) {
        isValid = true;
        item.setAttribute("data-error-visible", "false");
        item.setAttribute("data-validity", "true");
    } else {
        item.setAttribute("data-error-visible", "true");
        item.setAttribute("data-validity", "false");
    }
    return isValid;
}

function checkFormValidity() {
    const formData = document.querySelectorAll(".formData");
    let formValid = true;

    formData.forEach((item) => {
        if (item.getAttribute("data-error-visible") === "true") {
            formValid = false;
        }

        if (item.getAttribute("data-validity") === "false") {
            formValid = false;
        }
    });

    return formValid;
}

function checkFormInputs() {
    modalForm.querySelectorAll(".text-control").forEach((item) => {
        checkInputValidity(item);
        updateSubmitButton();
    });

    // check select input validity
    modalForm.querySelectorAll(".required-check").forEach((item) => {
        checkSelectValidity(item);
        updateSubmitButton();
    });
}

function updateSubmitButton() {
    const submitButton = modalForm.querySelector(".btn-submit");
    const formValid = checkFormValidity();

    //remove or add --disabled class if form is valid or not
    submitButton.classList[formValid ? "remove" : "add"]("--disabled");
}

/*
  • Mobile navigation handler
  ---------- ---------- ---------- ---------- ----------
*/

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-header__nav');

// toggle mobile navigation
menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('--is-open');
})

/*
  • Modal management
  ---------- ---------- ---------- ---------- ----------
*/

const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".modal-close");

// open handler
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
    modal.classList.add('--is-open')
}));

// close handler
modalClose.forEach(item => {
    item.addEventListener("click", () => {
        modal.classList.remove('--is-open')
    })
});

/*
  • Form management
  ---------- ---------- ---------- ---------- ----------
*/

const modalForm = document.querySelector(".modal-form");

if (modalForm) {
    // check text input validity
    modalForm.querySelectorAll(".text-control").forEach((item) => {
        item.addEventListener("change", () => {
            checkInputValidity(item);
            updateSubmitButton();
        });
    });

    // check select input validity
    modalForm.querySelectorAll(".required-check").forEach((item) => {
        item.addEventListener("change", () => {
            checkSelectValidity(item);
            updateSubmitButton();
        });
    });
}

modalForm.addEventListener('submit', event => {
    event.preventDefault();

    //remove or add --is-submitted class if form is valid or not
    modalForm.classList[checkFormValidity() ? "add" : "remove"]("--is-submitted");
})

modalForm.querySelector(".btn-submit.--disabled").addEventListener("click", () => {
    checkFormInputs();
})
