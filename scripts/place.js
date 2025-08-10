function updateFooter() {
  const currentYearElement = document.getElementById("currentyear");
  const today = new Date();
  const currentYear = today.getFullYear();
  currentYearElement.textContent = currentYear;

  const lastModifiedElement = document.getElementById("lastmodified");
  const lastModifiedDate = document.lastModified;
  lastModifiedElement.textContent = lastModifiedDate;
}

const temperature = 28;
const windSpeed = 12;

function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  );
}

function showWindChill() {
  const windChillPlace = document.getElementById("windchill");

  if (temperature <= 10 && windSpeed > 4.8) {
    const result = calculateWindChill(temperature, windSpeed);

    windChillPlace.textContent = Math.round(result) + "°C";
  } else {
    windChillPlace.textContent = "N/A";
  }
}

window.addEventListener("load", function() {
  updateFooter();
  showWindChill();
});