/*
  Index
  ---------- ---------- ---------- ---------- ----------
  • Mobile navigation handler
*/

/*
  • Mobile navigation handler
  ---------- ---------- ---------- ---------- ----------
*/
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-header__nav');

// click toggle event
menuToggle.addEventListener('click', () => {
  navigation.classList.toggle('--on-mobile')
})


/*
  • Modal management handler
  ---------- ---------- ---------- ---------- ----------
*/

const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".modal .close");

// open modal event
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modal.classList.add('--is-open')
}));

// close modal event

modalClose.addEventListener('click', () => {
  modal.classList.remove('--is-open')
})


const formData = document.querySelectorAll(".formData");

