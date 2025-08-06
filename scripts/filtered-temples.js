const currentYearElement = document.getElementById("currentyear");
const today = new Date();
const currentYear = today.getFullYear();
currentYearElement.textContent = currentYear;

const lastModifiedElement = document.getElementById("lastModified");
const lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = lastModifiedDate;

const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  menu.classList.toggle("show");
  if (menu.classList.contains("show")) {
    menuButton.textContent = "✕";
  } else {
    menuButton.textContent = "☰";
  }
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Lisbon Portugal",
    location: "Lisbon, Portugal",
    dedicated: "2019, September, 15",
    area: 23730,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/lisbon-portugal-temple/lisbon-portugal-temple-6315-main.jpg",
  },
  {
    templeName: "Rio de Janeiro Brazil",
    location: "Rio de Janeiro, Brazil",
    dedicated: "2022, May, 8",
    area: 29966,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rio-de-janeiro-brazil-temple/rio-de-janeiro-brazil-temple-8167-main.jpg",
  },
  {
    templeName: "Campinas Brazil",
    location: "Campinas, Brazil",
    dedicated: "2002, May, 17",
    area: 48100,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "2004, February, 22",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg",
  },
  {
    templeName: "Fortaleza Brazil",
    location: "Fortaleza, Brazil",
    dedicated: "2019, June, 02",
    area: 36000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/fortaleza-brazil-temple/fortaleza-brazil-temple-5569-main.jpg",
  },
];

function displayTemples(templesToDisplay) {
  var grid = document.getElementById("templeGrid");
  grid.innerHTML = "";

  for (var i = 0; i < templesToDisplay.length; i++) {
    var temple = templesToDisplay[i];

    var figure = document.createElement("figure");

    var img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    var caption = document.createElement("figcaption");
    caption.textContent = temple.templeName;

    var details = document.createElement("div");
    details.className = "temple-details";
    details.innerHTML =
      "<p><strong>Location:</strong> " +
      temple.location +
      "</p>" +
      "<p><strong>Dedicated:</strong> " +
      temple.dedicated +
      "</p>" +
      "<p><strong>Size:</strong> " +
      temple.area.toLocaleString() +
      " ft²</p>";

    figure.appendChild(img);
    figure.appendChild(caption);
    figure.appendChild(details);

    grid.appendChild(figure);
  }
}

displayTemples(temples);

var menuLinks = document.querySelectorAll("#menu a");
var h2 = document.querySelector("main h2");

for (var j = 0; j < menuLinks.length; j++) {
  menuLinks[j].addEventListener("click", function (event) {
    event.preventDefault();
    var filter = this.getAttribute("href").replace("#", "");
    var filteredTemples = temples;

    if (filter === "old") {
      filteredTemples = [];
      for (var k = 0; k < temples.length; k++) {
        var year = parseInt(temples[k].dedicated.split(",")[0]);
        if (year < 1900) {
          filteredTemples.push(temples[k]);
        }
      }
      h2.textContent = "Old Temples";
    } else if (filter === "new") {
      filteredTemples = [];
      for (var k = 0; k < temples.length; k++) {
        var year = parseInt(temples[k].dedicated.split(",")[0]);
        if (year > 2000) {
          filteredTemples.push(temples[k]);
        }
      }
      h2.textContent = "New Temples";
    } else if (filter === "large") {
      filteredTemples = [];
      for (var k = 0; k < temples.length; k++) {
        if (temples[k].area > 90000) {
          filteredTemples.push(temples[k]);
        }
      }
      h2.textContent = "Large Temples";
    } else if (filter === "small") {
      filteredTemples = [];
      for (var k = 0; k < temples.length; k++) {
        if (temples[k].area < 10000) {
          filteredTemples.push(temples[k]);
        }
      }
      h2.textContent = "Small Temples";
    } else {
      filteredTemples = temples;
      h2.textContent = "Home";
    }

    displayTemples(filteredTemples);
    menu.classList.remove("show");
    menuButton.textContent = "☰";
  });
}
