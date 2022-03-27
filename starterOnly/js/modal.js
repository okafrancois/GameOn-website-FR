/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Config
  • Mobile navigation handler
  • Mobile navigation handler
*/

/*
  • Mobile navigation handler
  ---------- ---------- ---------- ---------- ----------
*/

const INPUT_REGEX = {
  name: /^[ a-zA-Z-ç\-\']{2,}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  number: /^\d+$/,
}

function checkValueValidity(input, regexId) {
  const inputValue = input.value.trim();
  const inputRegex = INPUT_REGEX[regexId];

  return inputRegex.test(inputValue);
}

/*
  • Mobile navigation handler
  ---------- ---------- ---------- ---------- ----------
*/
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-header__nav');

// click toggle event
menuToggle.addEventListener('click', () => {
  navigation.classList.toggle('--on-mobile');
})

/*
  • Modal management
  ---------- ---------- ---------- ---------- ----------
*/

const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".modal .close");

// open handler
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modal.classList.add('--is-open')
}));

// close handler
modalClose.addEventListener('click', () => {
  modal.classList.remove('--is-open')
})

/*
  • Form management
  ---------- ---------- ---------- ---------- ----------
*/


const formData = document.querySelectorAll(".formData");

formData.forEach(item => {
  const itemInput = item.querySelector(".text-control");

  if (itemInput) {
    const regexId = item.getAttribute("data-validator");

    itemInput.addEventListener("change", () => {
      if (checkValueValidity(itemInput, regexId)) {
        item.setAttribute("data-error-visible", "false");
      } else {
        item.setAttribute("data-error-visible", "true");
      }
    });
  }

});


const modalForm = document.querySelector(".modal-form");

modalForm.addEventListener('submit', event => {
  event.preventDefault()
})
