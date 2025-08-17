function checkScreenSize() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 950) {
    loadMobileVersion();
  } else {
    loadDesktopVersion();
  }
}

function loadMobileVersion() {
  const bodyElement = document.body;
  const hasMobileClass = bodyElement.classList.contains("mobile-version");

  if (hasMobileClass === false) {
    window.location.href = "index-mobile.html";
  }
}

function loadDesktopVersion() {
  const bodyElement = document.body;
  const hasDesktopClass = bodyElement.classList.contains("desktop-version");

  if (hasDesktopClass === false) {
    window.location.href = "index.html";
  }
}

function handleResize() {
  checkScreenSize();
}

function handleLoad() {
  checkScreenSize();
}

window.addEventListener("resize", handleResize);
window.addEventListener("load", handleLoad);

document.addEventListener("DOMContentLoaded", function () {
  const screenWidth = window.innerWidth;
  const bodyElement = document.body;

  if (screenWidth <= 950) {
    bodyElement.classList.add("mobile-version");
  } else {
    bodyElement.classList.add("desktop-version");
  }
});
