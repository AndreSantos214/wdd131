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

function getProductNameById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i].name;
    }
  }
  return id;
}

function getOrDefault(value, fallback) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  } else {
    return value;
  }
}

function joinWithComma(list, emptyText) {
  if (list === null || list === undefined || list === "") {
    return emptyText;
  }

  let text = list[0];
  for (let i = 1; i < list.length; i++) {
    text = text + ", " + list[i];
  }
  return text;
}

function buildSummary() {
  const params = new URLSearchParams(window.location.search);

  const productId = getOrDefault(params.get("productId"), "");
  let productName;
  if (productId === "") {
    productName = "Not provided";
  } else {
    productName = getProductNameById(productId);
  }

  const rating = getOrDefault(params.get("rating"), "Not provided");
  const installDate = getOrDefault(params.get("installDate"), "Not provided");
  const features = params.getAll("features");
  const featuresText = joinWithComma(features, "None selected");
  const reviewText = getOrDefault(params.get("reviewText"), "No text");
  const userName = getOrDefault(params.get("userName"), "Anonymous");

  const summary = document.getElementById("summary");
  if (summary !== null) {
    summary.innerHTML =
      "<p><strong>Product:</strong> " +
      productName +
      "</p>" +
      "<p><strong>Rating (1–5):</strong> " +
      rating +
      "</p>" +
      "<p><strong>Date of installation:</strong> " +
      installDate +
      "</p>" +
      "<p><strong>Useful features:</strong> " +
      featuresText +
      "</p>" +
      "<p><strong>Written review:</strong> " +
      reviewText +
      "</p>" +
      "<p><strong>User Name:</strong> " +
      userName +
      "</p>";
  }
}

function updateReviewCounter() {
  let count = localStorage.getItem("reviewCount");
  if (count === null) {
    count = "0";
  }

  let numberCount = parseInt(count, 10);
  if (isNaN(numberCount)) {
    numberCount = 0;
  }

  const next = numberCount + 1;
  localStorage.setItem("reviewCount", String(next));

  const el = document.getElementById("reviewCount");
  if (el !== null) {
    el.textContent = String(next);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buildSummary();
  updateReviewCounter();
});

const currentYearElement = document.getElementById("currentyear");
const today = new Date();
const currentYear = today.getFullYear();
currentYearElement.textContent = currentYear;

const lastModifiedElement = document.getElementById("lastModified");
const lastModifiedDate = document.lastModified;
lastModifiedElement.textContent = lastModifiedDate;