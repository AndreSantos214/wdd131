const currentYearElement = document.getElementById('currentyear');
const today = new Date();
const currentYear = today.getFullYear();
currentYearElement.textContent = currentYear

const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = lastModifiedDate;