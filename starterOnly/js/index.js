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

function updateSubmitButton() {
    const submitButton = modalForm.querySelector(".btn-submit");
    let formValid = checkFormValidity();

    if (formValid) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "true");
    }
}

function checkInputValidity(item) {
    let testResult;
    const inputValue = item.value.trim();
    const regexId = item.parentElement.getAttribute("data-validator");
    const inputRegex = INPUT_REGEX[regexId];

    testResult = inputRegex.test(inputValue);

    if(inputValue) {
        if (testResult) {
            item.parentElement.setAttribute("data-error-visible", "false");
        } else {
            item.parentElement.setAttribute("data-error-visible", "true");
            return false;
        }
    }
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

    updateSubmitButton();
    return isValid;
}

/*
  • Mobile navigation handler
  ---------- ---------- ---------- ---------- ----------
*/

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-header__nav');

// toggle mobile navigation
menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('--on-mobile');
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

    if (checkFormValidity()) {
        modalForm.classList.add('--is-submitted');
    } else {
        modalForm.classList.remove('--is-submitted');
    }
})
