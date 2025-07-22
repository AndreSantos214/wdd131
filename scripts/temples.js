const currentYearElement = document.getElementById('currentyear');
const today = new Date();
const currentYear = today.getFullYear();
currentYearElement.textContent = currentYear

const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = lastModifiedDate;

const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('show');
  if (menu.classList.contains('show')) {
    menuButton.textContent = '✕'
  } else {
    menuButton.textContent = '☰';
  }
});