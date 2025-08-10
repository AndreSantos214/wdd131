const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5,
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7,
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5,
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9,
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0,
  },
];

function populateProducts() {
  const select = document.getElementById("productId");

  if (select === null) {
  } else {
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.text = p.name;
      select.appendChild(opt);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  populateProducts();
});

const currentYearElement = document.getElementById("currentyear");
const today = new Date();
const currentYear = today.getFullYear();
currentYearElement.textContent = currentYear;

const lastModifiedElement = document.getElementById("lastModified");
const lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = lastModifiedDate;